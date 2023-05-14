# Poločas nápadu's Redmine

> We need to track our work, despite we are a non-profit

## Configure SSO

We are using the [redmine_openid_connect](https://github.com/devopskube/redmine_openid_connect) plugin to achieve domain level SSO. Only users on domain @polocas-napadu.cz will have access to this.

1. Create internal GCP OAuth consent screen with following scopes:
    * `openid`
    * `.../auth/userinfo.email`
    * `.../auth/userinfo.profile`
2. Create OAuth client ID
    * Application type: Web application
    * Redirect URIs:
        * `{origin}/oic/local_login`
        * `{origin}/oic/local_logout`
3. Copypasta the Client ID and Client Secret
4. Define OpenID server URL: `https://accounts.google.com`
5. Define OpenID Connect Scopes: `openid,https://www.googleapis.com/auth/userinfo.profile,https://www.googleapis.com/auth/userinfo.email`
6. Enable plugin
