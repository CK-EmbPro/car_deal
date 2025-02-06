#!/bin/bash

# Get the list of unstaged files
CHANGES=$(git status --porcelain | awk '{print $2}')

# Check if there are any changes
if [ -z "$CHANGES" ]; then
    echo "No changes to commit."
    exit 0
fi

# Loop through each file and commit separately
for FILE in $CHANGES; do
    echo "Adding and committing: $FILE"
    git add "$FILE"
    git commit -m "Updated: $FILE"
done

# Push changes at the end
echo "Pushing all committed changes..."
git push origin -uf $(git branch --show-current)

echo "All changes pushed successfully!"
