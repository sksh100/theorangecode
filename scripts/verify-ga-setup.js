#!/usr/bin/env node

/**
 * Google Analytics Setup Verification Script
 * 
 * This script checks if Google Analytics is properly configured
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying Google Analytics Setup...\n');

let hasErrors = false;
let hasWarnings = false;

// Check 1: GoogleAnalytics component exists
console.log('1. Checking GoogleAnalytics component...');
const gaComponentPath = path.join(__dirname, '../src/components/GoogleAnalytics.tsx');
if (fs.existsSync(gaComponentPath)) {
  console.log('   ✅ GoogleAnalytics component exists');
  
  // Check if it uses the correct env variable
  const gaContent = fs.readFileSync(gaComponentPath, 'utf8');
  if (gaContent.includes('NEXT_PUBLIC_GA_MEASUREMENT_ID')) {
    console.log('   ✅ Uses NEXT_PUBLIC_GA_MEASUREMENT_ID environment variable');
  } else {
    console.log('   ❌ Does not use NEXT_PUBLIC_GA_MEASUREMENT_ID');
    hasErrors = true;
  }
} else {
  console.log('   ❌ GoogleAnalytics component not found');
  hasErrors = true;
}

// Check 2: Component is imported in layout
console.log('\n2. Checking layout integration...');
const layoutPath = path.join(__dirname, '../src/app/layout.tsx');
if (fs.existsSync(layoutPath)) {
  const layoutContent = fs.readFileSync(layoutPath, 'utf8');
  if (layoutContent.includes('GoogleAnalytics')) {
    console.log('   ✅ GoogleAnalytics is imported in layout');
    if (layoutContent.includes('<GoogleAnalytics')) {
      console.log('   ✅ GoogleAnalytics component is rendered');
    } else {
      console.log('   ⚠️  GoogleAnalytics component imported but not rendered');
      hasWarnings = true;
    }
  } else {
    console.log('   ❌ GoogleAnalytics not found in layout');
    hasErrors = true;
  }
} else {
  console.log('   ❌ Layout file not found');
  hasErrors = true;
}

// Check 3: Analytics utility functions exist
console.log('\n3. Checking analytics utility functions...');
const analyticsLibPath = path.join(__dirname, '../src/lib/analytics.ts');
if (fs.existsSync(analyticsLibPath)) {
  console.log('   ✅ Analytics utility functions exist');
  
  const analyticsContent = fs.readFileSync(analyticsLibPath, 'utf8');
  const requiredFunctions = [
    'trackEvent',
    'trackButtonClick',
    'trackMasterclassSelect',
    'trackCheckoutStart'
  ];
  
  requiredFunctions.forEach(func => {
    if (analyticsContent.includes(func)) {
      console.log(`   ✅ ${func} function exists`);
    } else {
      console.log(`   ⚠️  ${func} function not found`);
      hasWarnings = true;
    }
  });
} else {
  console.log('   ⚠️  Analytics utility file not found (optional)');
  hasWarnings = true;
}

// Check 4: Environment variable in .env.local
console.log('\n4. Checking environment variables...');
const envLocalPath = path.join(__dirname, '../.env.local');
if (fs.existsSync(envLocalPath)) {
  const envContent = fs.readFileSync(envLocalPath, 'utf8');
  if (envContent.includes('NEXT_PUBLIC_GA_MEASUREMENT_ID')) {
    const match = envContent.match(/NEXT_PUBLIC_GA_MEASUREMENT_ID=(.+)/);
    if (match && match[1]) {
      const value = match[1].trim();
      if (value.startsWith('G-')) {
        console.log(`   ✅ NEXT_PUBLIC_GA_MEASUREMENT_ID is set: ${value}`);
      } else {
        console.log(`   ⚠️  NEXT_PUBLIC_GA_MEASUREMENT_ID value doesn't look correct: ${value}`);
        hasWarnings = true;
      }
    } else {
      console.log('   ⚠️  NEXT_PUBLIC_GA_MEASUREMENT_ID found but value is empty');
      hasWarnings = true;
    }
  } else {
    console.log('   ⚠️  NEXT_PUBLIC_GA_MEASUREMENT_ID not found in .env.local');
    console.log('   💡 Add it to .env.local for local development');
    hasWarnings = true;
  }
} else {
  console.log('   ⚠️  .env.local file not found');
  console.log('   💡 Create .env.local and add NEXT_PUBLIC_GA_MEASUREMENT_ID=G-BE1VBMP27H');
  hasWarnings = true;
}

// Check 5: Documentation files
console.log('\n5. Checking documentation...');
const docs = [
  'GOOGLE_ANALYTICS_SETUP.md',
  'VERCEL_GA_SETUP_INSTRUCTIONS.md',
  'GOOGLE_ANALYTICS_IP_EXCLUSION.md',
  'GA_SETUP_CHECKLIST.md'
];

docs.forEach(doc => {
  const docPath = path.join(__dirname, '..', doc);
  if (fs.existsSync(docPath)) {
    console.log(`   ✅ ${doc} exists`);
  } else {
    console.log(`   ⚠️  ${doc} not found`);
  }
});

// Summary
console.log('\n' + '='.repeat(50));
console.log('📊 VERIFICATION SUMMARY\n');

if (hasErrors) {
  console.log('❌ ERRORS FOUND: Please fix the errors above');
  process.exit(1);
} else if (hasWarnings) {
  console.log('⚠️  WARNINGS: Some optional items need attention');
  console.log('\n💡 Next Steps:');
  console.log('   1. Add NEXT_PUBLIC_GA_MEASUREMENT_ID to Vercel environment variables');
  console.log('   2. Redeploy your site');
  console.log('   3. Check Google Analytics Realtime reports');
  process.exit(0);
} else {
  console.log('✅ ALL CHECKS PASSED!');
  console.log('\n💡 Next Steps:');
  console.log('   1. Add NEXT_PUBLIC_GA_MEASUREMENT_ID to Vercel environment variables');
  console.log('   2. Redeploy your site');
  console.log('   3. Check Google Analytics Realtime reports');
  process.exit(0);
}

