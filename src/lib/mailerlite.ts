import MailerLite from '@mailerlite/mailerlite-nodejs'

export interface MailerLiteData {
  firstName?: string
  lastName?: string
  name: string
  email: string
  phone?: string
  timestamp: string
  source: string
  tags?: string[]
}

export async function addToMailerLite(data: MailerLiteData): Promise<{ success: boolean; error?: string }> {
  try {
    const apiKey = process.env.MAILERLITE_API_KEY
    const groupId = process.env.MAILERLITE_GROUP_ID
    
    console.log('📧 MailerLite config check:', {
      hasApiKey: !!apiKey,
      hasGroupId: !!groupId,
      groupId: groupId || 'missing'
    })
    
    if (!apiKey) {
      console.log('⚠️ MailerLite not configured - missing API key')
      return { success: false, error: 'Missing API key' }
    }

    const mailerlite = new MailerLite({
      api_key: apiKey,
    })

    // Prepare subscriber data - simplified format
    const subscriberData: any = {
      email: data.email,
      status: 'active',
      fields: {},
    }

    // Add name fields if available
    if (data.name && data.name !== 'Anonymous') {
      subscriberData.fields.name = data.name
    }
    if (data.firstName) {
      subscriberData.fields.first_name = data.firstName
    }
    if (data.lastName) {
      subscriberData.fields.last_name = data.lastName
    }

    // Add phone if available
    if (data.phone && data.phone.trim()) {
      subscriberData.fields.phone = data.phone.trim()
    }

    // Add source/utm tracking
    if (data.source) {
      subscriberData.fields.source = data.source
    }

    console.log('📝 Adding subscriber to MailerLite:', {
      email: data.email,
      groupId: groupId || 'none',
      hasName: !!data.name,
      hasPhone: !!data.phone,
      subscriberData
    })

    // Add groups to subscriber data if group ID is provided
    // Use string format (not integer) to match MailerLite API requirements
    // Including groups in initial createOrUpdate triggers "subscriber joins group" automation
    if (groupId) {
      subscriberData.groups = [groupId]
    }
    
    // Add subscriber to MailerLite with groups included
    // This triggers the automation when subscriber joins the group
    console.log('🔄 Calling MailerLite API with data:', JSON.stringify(subscriberData, null, 2))
    const response = await mailerlite.subscribers.createOrUpdate(subscriberData)

    // Extract subscriber data from response (handle different response structures)
    const subscriberData_response: any = response.data?.data || response.data || {}
    
    console.log('✅ Subscriber added to MailerLite successfully:', {
      email: data.email,
      subscriberId: subscriberData_response.id || 'unknown',
      groups: subscriberData_response.groups || [],
      status: subscriberData_response.status || 'unknown',
      subscribed_at: subscriberData_response.subscribed_at || 'unknown',
      fullResponse: JSON.stringify(response, null, 2)
    })
    
    // Log automation trigger info
    const groups = subscriberData_response.groups || []
    const isInGroup = groupId && Array.isArray(groups) && groups.some((g: any) => 
      (typeof g === 'string' && g === groupId) || 
      (typeof g === 'number' && groupId && g === parseInt(groupId)) ||
      (g?.id && groupId && (g.id.toString() === groupId || g.id === parseInt(groupId)))
    )
    
    console.log('🔍 MailerLite Group Check:', {
      email: data.email,
      expectedGroupId: groupId,
      actualGroups: groups,
      groupsType: typeof groups,
      isArray: Array.isArray(groups),
      isInGroup: isInGroup,
      subscriberStatus: subscriberData_response.status
    })
    
    if (groupId && isInGroup) {
      console.log('✅ Subscriber is in group - automation should trigger')
    } else if (groupId) {
      console.warn('⚠️ Subscriber may not be in group - automation may not trigger. Check MailerLite dashboard manually.')
    }
    
    return { success: true }
  } catch (error: any) {
    const errorMessage = error.message || error.toString()
    const errorStatus = error.response?.status
    const errorDetails = error.response?.data || error.toString()
    
    console.error('❌ MailerLite error:', {
      message: errorMessage,
      status: errorStatus,
      statusText: error.response?.statusText,
      details: errorDetails,
      errorName: error.name,
      errorCode: error.code,
      apiKey: process.env.MAILERLITE_API_KEY ? `${process.env.MAILERLITE_API_KEY.substring(0, 8)}...` : 'missing',
      fullError: JSON.stringify(error, null, 2)
    })
    
    // Check if subscriber already exists (not an error, just informational)
    if (errorMessage?.includes('already exists') || errorStatus === 409) {
      console.log('ℹ️ Subscriber already exists in MailerLite - treating as success')
      // Still return true as this is not a failure
      return { success: true }
    }
    
    // Check for authentication errors
    if (errorStatus === 401 || errorStatus === 403) {
      console.error('🔐 MailerLite Authentication Error - Check API Key')
      return { 
        success: false, 
        error: `Authentication failed (${errorStatus}). Check MAILERLITE_API_KEY.`
      }
    }
    
    // Don't throw - allow submission to continue even if MailerLite fails
    return { 
      success: false, 
      error: `${errorMessage}${errorStatus ? ` (Status: ${errorStatus})` : ''}` 
    }
  }
}

