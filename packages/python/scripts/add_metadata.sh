#!/bin/bash

# Input file (Markdown file)
FILE="$1"

# Extract the first meaningful line AFTER the front matter
TITLE=$(awk '
  BEGIN {foundFrontMatter=0}
  /^---$/ {foundFrontMatter++; next}
  foundFrontMatter==2 && NF {print $0; exit}
' "$FILE")

# Ensure the title is valid and not empty
if [[ -z "$TITLE" ]]; then
  echo "⚠️ Error: Could not find a valid title in $FILE"
  exit 1
fi

echo "✅ Extracted title: '$TITLE'"

# Remove only the first occurrence of TITLE in the document body
sed -i "0,/$TITLE/{/$TITLE/d}" "$FILE"

# Replace "post-render" with the extracted title
sed -i "s/title: post-render/title: $TITLE/g" "$FILE"
sed -i "s/description: post-render/description: $TITLE/g" "$FILE"

echo "✅ Replaced metadata and removed duplicate title in $FILE"
