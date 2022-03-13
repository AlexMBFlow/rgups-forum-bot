export class PostConfigCreator {
    constructor(
        host,
        connection,
        contentLength,
        cacheControl,
        upgradeInsecureRequests,
        origin,
        contentType,
        userAgent,
        accept,
        referer,
        acceptEncoding,
        acceptLanguage
    ) {
        this.host = host
        this.connection = connection
        this.contentLength = contentLength
        this.cacheControl = cacheControl
        this.upgradeInsecureRequests = upgradeInsecureRequests
        this.origin = origin
        this.contentType = contentType
        this.userAgent = userAgent
        this.accept = accept
        this.referer = referer
        this.acceptEncoding = acceptEncoding
        this.acceptLanguage = acceptLanguage
    }
}