/* eslint-disable @next/next/no-img-element -- ImageResponse renders plain HTML, not Next image components. */
import type { Article } from "@/lib/articles";
import { siteContent } from "@/lib/content";

export function ArticleShareCard({ article, imageData }: { article: Article; imageData: string }) {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", padding: 40, borderTop: "10px solid #f97316", background: "#101012", color: "#f9fafb" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, color: "#fb923c" }}>
        <span>{article.domain}</span>
        <span>Writing</span>
      </div>
      <div style={{ display: "flex", flex: 1, alignItems: "center", gap: 36, marginTop: 24, marginBottom: 24 }}>
        <img src={imageData} width={440} height={420} alt="" style={{ objectFit: "cover", borderRadius: 18 }} />
        <div style={{ display: "flex", flex: 1, flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", fontSize: 43, lineHeight: 1.16, fontWeight: 700 }}>{article.title}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 23 }}>
            <span>{siteContent.person.name}</span>
            <span style={{ color: "#b9b9c0", fontSize: 20 }}>{siteContent.person.title}, {siteContent.person.affiliation}</span>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", fontSize: 20, color: "#b9b9c0" }}>www.salehiyan.com</div>
    </div>
  );
}
