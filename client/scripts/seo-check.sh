#!/bin/bash

# SEO Check Script for Templo Adoracion Y Alabanza
echo "🔍 Running SEO checks for Templo Adoracion Y Alabanza..."

# Set the domain (change this to your actual domain)
DOMAIN="https://temploaa.com"

# Check if domain is provided as argument
if [ "$1" != "" ]; then
    DOMAIN="$1"
fi

echo "📍 Checking domain: $DOMAIN"

# Create reports directory
mkdir -p reports

# 1. Lighthouse SEO audit
echo "🚀 Running Lighthouse SEO audit..."
npx lighthouse $DOMAIN \
  --only-categories=performance,seo,accessibility,best-practices \
  --output=html \
  --output-path=./reports/lighthouse-report.html \
  --chrome-flags="--headless --no-sandbox"

# 2. Check for broken links
echo "🔗 Checking for broken links..."
npx broken-link-checker $DOMAIN --recursive --ordered > ./reports/broken-links.txt

# 3. Check sitemap
echo "🗺️  Checking sitemap..."
curl -s "$DOMAIN/sitemap.xml" > ./reports/sitemap.xml
if [ $? -eq 0 ]; then
    echo "✅ Sitemap found and downloaded"
else
    echo "❌ Sitemap not found"
fi

# 4. Check robots.txt
echo "🤖 Checking robots.txt..."
curl -s "$DOMAIN/robots.txt" > ./reports/robots.txt
if [ $? -eq 0 ]; then
    echo "✅ Robots.txt found and downloaded"
else
    echo "❌ Robots.txt not found"
fi

# 5. Check meta tags on key pages
echo "🏷️  Checking meta tags..."
PAGES=("/" "/events" "/services" "/ministries" "/sermons")

for page in "${PAGES[@]}"; do
    echo "Checking $DOMAIN$page..."
    curl -s "$DOMAIN$page" | grep -i "<title\|<meta.*description\|<meta.*keywords" > "./reports/meta-tags-$page.txt" 2>/dev/null
    # Replace / with - for filename
    filename=$(echo $page | sed 's/\//-/g')
    if [ "$filename" = "-" ]; then
        filename="home"
    fi
    curl -s "$DOMAIN$page" | grep -i "<title\|<meta.*description\|<meta.*keywords" > "./reports/meta-tags-$filename.txt" 2>/dev/null
done

# 6. Check structured data
echo "📊 Checking structured data..."
curl -s "$DOMAIN" | grep -o 'application/ld+json[^>]*>[^<]*' > ./reports/structured-data.txt

# 7. Check page speed insights (if API key is available)
if [ "$PAGESPEED_API_KEY" != "" ]; then
    echo "⚡ Running PageSpeed Insights..."
    curl -s "https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=$DOMAIN&key=$PAGESPEED_API_KEY" > ./reports/pagespeed.json
fi

# 8. Generate summary report
echo "📋 Generating summary report..."
cat > ./reports/seo-summary.md << EOF
# SEO Report for Templo Adoracion Y Alabanza

**Date:** $(date)
**Domain:** $DOMAIN

## Files Generated:
- \`lighthouse-report.html\` - Comprehensive Lighthouse audit
- \`broken-links.txt\` - Broken link checker results
- \`sitemap.xml\` - Site sitemap
- \`robots.txt\` - Robots.txt file
- \`meta-tags-*.txt\` - Meta tags for each page
- \`structured-data.txt\` - JSON-LD structured data

## Quick Checks:
- Sitemap: $([ -f ./reports/sitemap.xml ] && echo "✅ Found" || echo "❌ Missing")
- Robots.txt: $([ -f ./reports/robots.txt ] && echo "✅ Found" || echo "❌ Missing")
- Structured Data: $([ -s ./reports/structured-data.txt ] && echo "✅ Found" || echo "❌ Missing")

## Next Steps:
1. Review the Lighthouse report for performance and SEO recommendations
2. Fix any broken links found
3. Ensure all pages have proper meta descriptions and titles
4. Verify structured data is properly implemented
5. Submit sitemap to Google Search Console

EOF

echo "✅ SEO checks completed!"
echo "📁 Reports saved in ./reports/ directory"
echo "🌐 Open ./reports/lighthouse-report.html to view the detailed audit" 