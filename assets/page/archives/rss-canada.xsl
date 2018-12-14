<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" 
xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output method="xml" version="1.0" omit-xml-declaration="yes" indent="yes" media-type="text/html"/>
<xsl:template match="rss/channel">
<xsl:for-each select="item[position() &lt; 6]">

<div class="media item-body">
  <div class="media-body">
    <xsl:value-of select="description" disable-output-escaping="yes" />
  </div>
</div>
<div class="item-footer blockquote-footer">
  <xsl:value-of select="title"/> 
  <xsl:value-of select="pubDate"/> 
  <cite title="Source Title"> By <xsl:value-of select="author"/></cite>
</div>

</xsl:for-each>
</xsl:template>
</xsl:stylesheet>