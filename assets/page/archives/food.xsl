<?xml version="1.0" encoding="UTF-8"?>
<html xsl:version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<body style="font-family:Arial;font-size:12pt;background-color:#EEEEEE">
<xsl:for-each select="breakfast_menu/food">
  <div class="food-body">
    <span class="food-title"><xsl:value-of select="name"/> - </span>
    <xsl:value-of select="price"/>
    </div>
  <div class="food-desc">
    <p>
    <xsl:value-of select="description"/>
    <span class="italic"> (<xsl:value-of select="calories"/> calories per serving)</span>
    </p>
  </div>
</xsl:for-each>
</body>
</html>
