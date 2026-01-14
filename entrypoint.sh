#!/bin/bash

# Display build information if available
if [ -f /app/build_info ]; then
    echo "======================================"
    echo "📦 Build Information:"
    cat /app/build_info
    echo "======================================"
fi

# Display environment
echo "🌍 Starting application in ${ENVIRONMENT} environment..."
echo "⏰ Start Time: $(date '+%d-%m-%Y %H:%M:%S %Z')"

# Start the Node.js application
cd /app
exec npm run start
