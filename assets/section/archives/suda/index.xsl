<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output method="xml" version="1.0" omit-xml-declaration="yes" indent="yes" media-type="text/html"/>

<xsl:template match="post">
<meta property="cms:title" content="title"/>
<meta property="cms:publishedAt" content="pubDate"/>
<meta property="cms:desc" content="content"/>
<meta property="cms:author" content="author"/>

<h1 class="cms-title display-8"><xsl:value-of select="title" /></h1>

<div class="item-footer blockquote-footer">
  <xsl:value-of select="date" disable-output-escaping="yes"/>
  <xsl:value-of select="pubDate"/>
  <cite title="Source Title"> By <xsl:value-of select="author"/></cite>
</div>
<div class="media item-body">
  <div class="media-body">
    <span class="cms-desc w-100"><xsl:value-of select="content" disable-output-escaping="no" /></span>
  </div>
</div>

<hr />
<div class="comment-container">
  <h5>Responses:</h5>
  <ul class="list-unstyled">

    <xsl:for-each select="comments">
      <xsl:if test="comment">
        <li class="media">
          <div class="media-body">
            <div class="mr-1"><xsl:value-of select="comment/content" /></div>
            <div class="blockquote-footer">
              <cite title="Source Title">
                <xsl:value-of select="comment/date"/> by <xsl:value-of select="comment/author" />
              </cite>
            </div>
          </div>
        </li>
      </xsl:if>
    </xsl:for-each>

  </ul>
</div>

</xsl:template>
</xsl:stylesheet>
