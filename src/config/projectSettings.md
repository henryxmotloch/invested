
# Project Settings Guide

## Removing the Lovable Badge

To remove the Lovable badge from your deployed application:

1. Go to Project Settings in the Lovable dashboard
2. Find the "Show Lovable Badge" toggle
3. Switch it to the OFF position
4. Save changes
5. Redeploy your application

## Custom Domain Setup

To connect your Namecheap domain to your Lovable app:

1. In the Lovable dashboard, go to Project > Settings > Domains
2. Add your custom domain (e.g., yourdomain.com)
3. Copy the provided verification records

In your Namecheap account:
1. Go to the Domain List and select your domain
2. Click "Manage"
3. Navigate to "Advanced DNS"
4. Add the following records:
   - Add a CNAME record with:
     - Host: www (or your subdomain)
     - Value: The provided Lovable CNAME value
   - Add TXT records for domain verification
   - If using root domain (yourdomain.com without www), add an A record pointing to Lovable's IP address

5. Return to Lovable and verify your domain

Note: DNS changes can take up to 48 hours to fully propagate, though they often complete much sooner.
