import { NextRequest, NextResponse } from 'next/server'
import { kv } from '@vercel/kv'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { contentId, platform } = body

    if (!contentId || !platform) {
      return NextResponse.json(
        { success: false, error: 'Content ID and platform are required' },
        { status: 400 }
      )
    }

    // Get content
    const contentData = await kv.get(`content:${contentId}`)
    if (!contentData) {
      return NextResponse.json(
        { success: false, error: 'Content not found' },
        { status: 404 }
      )
    }

    const content = JSON.parse(contentData as string)

    // Get access token for the platform
    const { kv } = await import('@vercel/kv')
    
    let postResult = {
      success: false,
      postId: null,
      error: null,
    }

    try {
      switch (platform.toLowerCase()) {
        case 'instagram': {
          const accessToken = await kv.get('instagram_access_token')
          if (!accessToken) {
            return NextResponse.json(
              { success: false, error: 'Instagram account not connected. Please connect your account first.' },
              { status: 401 }
            )
          }

          // Instagram Graph API - Create Media Container
          const mediaResponse = await fetch(`https://graph.instagram.com/v18.0/me/media?image_url=${encodeURIComponent(content.mediaUrl)}&caption=${encodeURIComponent(content.caption + ' ' + (content.hashtags || []).map((h: string) => `#${h}`).join(' '))}&access_token=${accessToken}`, {
            method: 'POST',
          })

          const mediaData = await mediaResponse.json()
          
          if (mediaData.id) {
            // Publish the media
            const publishResponse = await fetch(`https://graph.instagram.com/v18.0/me/media_publish?creation_id=${mediaData.id}&access_token=${accessToken}`, {
              method: 'POST',
            })

            const publishData = await publishResponse.json()
            
            postResult = {
              success: !!publishData.id,
              postId: publishData.id || mediaData.id,
              error: publishData.error?.message || null,
            }
          } else {
            postResult = {
              success: false,
              postId: null,
              error: mediaData.error?.message || 'Failed to create Instagram post',
            }
          }
          break
        }

        case 'linkedin': {
          const accessToken = await kv.get('linkedin_access_token')
          if (!accessToken) {
            return NextResponse.json(
              { success: false, error: 'LinkedIn account not connected. Please connect your account first.' },
              { status: 401 }
            )
          }

          // Get user's LinkedIn person ID
          const profileResponse = await fetch('https://api.linkedin.com/v2/userinfo', {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
            },
          })

          const profile = await profileResponse.json()
          const personUrn = profile.sub || `urn:li:person:${profile.id}`

          // Create LinkedIn post
          const postData = {
            author: personUrn,
            lifecycleState: 'PUBLISHED',
            specificContent: {
              'com.linkedin.ugc.ShareContent': {
                shareCommentary: {
                  text: content.caption + ' ' + (content.hashtags || []).map((h: string) => `#${h}`).join(' '),
                },
                shareMediaCategory: 'IMAGE',
                media: content.mediaUrl ? [{
                  status: 'READY',
                  media: content.mediaUrl,
                  title: {
                    text: content.altText || content.caption.substring(0, 200),
                  },
                }] : [],
              },
            },
            visibility: {
              'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC',
            },
          }

          const linkedinResponse = await fetch('https://api.linkedin.com/v2/ugcPosts', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
              'X-Restli-Protocol-Version': '2.0.0',
            },
            body: JSON.stringify(postData),
          })

          const linkedinData = await linkedinResponse.json()
          
          postResult = {
            success: !!linkedinData.id,
            postId: linkedinData.id || null,
            error: linkedinData.error?.message || null,
          }
          break
        }

        case 'pinterest': {
          const accessToken = await kv.get('pinterest_access_token')
          if (!accessToken) {
            return NextResponse.json(
              { success: false, error: 'Pinterest account not connected. Please connect your account first.' },
              { status: 401 }
            )
          }

          // Get user's boards (you might want to let user select a board)
          const boardsResponse = await fetch('https://api.pinterest.com/v5/boards', {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
            },
          })

          const boards = await boardsResponse.json()
          const boardId = boards.items?.[0]?.id

          if (!boardId) {
            return NextResponse.json(
              { success: false, error: 'No Pinterest boards found. Please create a board first.' },
              { status: 400 }
            )
          }

          // Create Pinterest pin
          const pinData = {
            board_id: boardId,
            media_source: {
              source_type: 'image_url',
              url: content.mediaUrl,
            },
            title: content.caption.substring(0, 100),
            description: content.caption + ' ' + (content.hashtags || []).map((h: string) => `#${h}`).join(' '),
            alt_text: content.altText || content.caption.substring(0, 500),
          }

          const pinterestResponse = await fetch('https://api.pinterest.com/v5/pins', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(pinData),
          })

          const pinterestData = await pinterestResponse.json()
          
          postResult = {
            success: !!pinterestData.id,
            postId: pinterestData.id || null,
            error: pinterestData.error?.message || null,
          }
          break
        }

        case 'twitter':
        case 'x': {
          const accessToken = await kv.get('twitter_access_token')
          if (!accessToken) {
            return NextResponse.json(
              { success: false, error: 'Twitter/X account not connected. Please connect your account first.' },
              { status: 401 }
            )
          }

          // Create Twitter/X post
          const tweetText = content.caption + ' ' + (content.hashtags || []).map((h: string) => `#${h}`).join(' ')
          
          // Twitter API v2 - Create Tweet
          const tweetData = {
            text: tweetText.substring(0, 280), // Twitter character limit
            ...(content.mediaUrl && {
              media: {
                media_ids: [content.mediaUrl], // Note: Twitter requires media upload first, then use media_id
              },
            }),
          }

          const twitterResponse = await fetch('https://api.twitter.com/2/tweets', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(tweetData),
          })

          const twitterData = await twitterResponse.json()
          
          postResult = {
            success: !!twitterData.data?.id,
            postId: twitterData.data?.id || null,
            error: twitterData.errors?.[0]?.message || null,
          }
          break
        }

        default:
          postResult = {
            success: false,
            postId: null,
            error: `Unsupported platform: ${platform}`,
          }
      }

      if (postResult.success) {
        // Update content status
        const updatedContent = {
          ...content,
          status: 'published',
          publishedDate: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }

        await kv.setex(`content:${contentId}`, 86400 * 365, JSON.stringify(updatedContent))
      }

      return NextResponse.json({
        success: postResult.success,
        data: {
          postId: postResult.postId,
          platform,
          contentId,
        },
        error: postResult.error,
      })
    } catch (error: any) {
      console.error(`Error posting to ${platform}:`, error)
      return NextResponse.json(
        {
          success: false,
          error: `Failed to post to ${platform}: ${error.message}`,
        },
        { status: 500 }
      )
    }
  } catch (error: any) {
    console.error('Error in publish route:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

