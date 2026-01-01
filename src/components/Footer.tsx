import { useEffect } from "react";
import { CompanyDetails } from "@/types/api";

interface FooterProps {
  companyDetails: CompanyDetails;
}

const Footer = ({ companyDetails }: FooterProps) => {
  useEffect(() => {
    // Load Instagram embed script
    const instaScript = document.createElement("script");
    instaScript.src = "//www.instagram.com/embed.js";
    instaScript.async = true;
    document.body.appendChild(instaScript);

    // Load TikTok embed script
    const tiktokScript = document.createElement("script");
    tiktokScript.src = "https://www.tiktok.com/embed.js";
    tiktokScript.async = true;
    document.body.appendChild(tiktokScript);

    // Process embeds after scripts load
    const handleLoad = () => {
      if ((window as any).instgrm) {
        (window as any).instgrm.Embeds.process();
      }
    };
    instaScript.addEventListener("load", handleLoad);

    return () => {
      instaScript.removeEventListener("load", handleLoad);
      if (document.body.contains(instaScript)) {
        document.body.removeChild(instaScript);
      }
      if (document.body.contains(tiktokScript)) {
        document.body.removeChild(tiktokScript);
      }
    };
  }, []);

  // Common card styles for all three columns
  const cardStyles =
    "bg-background rounded-3xl shadow-sm p-4 md:p-6 \
   flex flex-col items-center justify-between \
   h-full min-h-[420px] \
   text-center";

  return (
    <footer id="contact" className="py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-4">

        {/* Cute Divider */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="h-px w-10 bg-gradient-to-r from-transparent to-yellow-600" />
          <p className="font-body text-[0.7rem] uppercase tracking-[0.25em] text-yellow-700">
            Follow Along
          </p>
          <div className="h-px w-10 bg-gradient-to-r from-yellow-600 to-transparent" />
        </div>

        {/* Social Grid - 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr">

          {/* Instagram Card */}
          <div className={cardStyles}>
            <blockquote
              className="instagram-media"
              data-instgrm-permalink={companyDetails.insta_link || "https://www.instagram.com/silwal_photography/?utm_source=ig_embed&utm_campaign=loading"}
              data-instgrm-version="14"
              style={{
                background: "#FFF",
                border: 0,
                borderRadius: "8px",
                boxShadow: "0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)",
                margin: 0,
                maxWidth: "100%",
                minWidth: "280px",
                padding: 0,
                width: "100%",
              }}
            >
              <div style={{ padding: "16px" }}>
                <a
                  href={companyDetails.insta_link || "https://www.instagram.com/silwal_photography/?utm_source=ig_embed&utm_campaign=loading"}
                  style={{
                    background: "#FFFFFF",
                    lineHeight: 0,
                    padding: "0 0",
                    textAlign: "center",
                    textDecoration: "none",
                    width: "100%",
                    display: "block",
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <div
                      style={{
                        backgroundColor: "#F4F4F4",
                        borderRadius: "50%",
                        flexGrow: 0,
                        height: "40px",
                        marginRight: "14px",
                        width: "40px",
                      }}
                    />
                    <div style={{ display: "flex", flexDirection: "column", flexGrow: 1, justifyContent: "center" }}>
                      <div
                        style={{
                          backgroundColor: "#F4F4F4",
                          borderRadius: "4px",
                          flexGrow: 0,
                          height: "14px",
                          marginBottom: "6px",
                          width: "100px",
                        }}
                      />
                      <div
                        style={{
                          backgroundColor: "#F4F4F4",
                          borderRadius: "4px",
                          flexGrow: 0,
                          height: "14px",
                          width: "60px",
                        }}
                      />
                    </div>
                  </div>
                  <div style={{ padding: "19% 0" }} />
                  <div style={{ display: "block", height: "50px", margin: "0 auto 12px", width: "50px" }}>
                    <svg width="50px" height="50px" viewBox="0 0 60 60" version="1.1" xmlns="http://www.w3.org/2000/svg">
                      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                        <g transform="translate(-511.000000, -20.000000)" fill="#000000">
                          <g>
                            <path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631" />
                          </g>
                        </g>
                      </g>
                    </svg>
                  </div>
                  <div style={{ paddingTop: "8px" }}>
                    <div
                      style={{
                        color: "#3897f0",
                        fontFamily: "Arial,sans-serif",
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: 550,
                        lineHeight: "18px",
                      }}
                    >
                      View this profile on Instagram
                    </div>
                  </div>
                </a>
                <p
                  style={{
                    color: "#c9c8cd",
                    fontFamily: "Arial,sans-serif",
                    fontSize: "14px",
                    lineHeight: "17px",
                    marginBottom: 0,
                    marginTop: "8px",
                    overflow: "hidden",
                    padding: "8px 0 7px",
                    textAlign: "center",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  <a
                    href={companyDetails.insta_link || "https://www.instagram.com/silwal_photography/"}
                    style={{
                      color: "#c9c8cd",
                      fontFamily: "Arial,sans-serif",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: "normal",
                      lineHeight: "17px",
                    }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    @silwal_photography
                  </a>
                </p>
              </div>
            </blockquote>
          </div>

          {/* Center Contact Card */}
          <div className={cardStyles}>

            <h2 className="font-display text-2xl md:text-3xl font-medium text-foreground text-center">
              Let's <span className="text-yellow-600">Connect!</span>
            </h2>
            <img
              src={companyDetails.logo}
              alt={companyDetails.logo_name}
              className="h-18 w-auto"
            />
            {/* <p className="font-body text-sm text-muted-foreground text-center mb-4">
              I'd love to hear about your wedding, graduation, or special event.
            </p> */}

            <div className="space-y-2 text-center mb-4">
              <p className="font-body text-sm text-muted-foreground">
                <a
                  href={`mailto:${companyDetails.email}`}
                  className="hover:text-yellow-600 transition-colors font-medium"
                >
                  {companyDetails.email}
                </a>
              </p>
              <p className="font-body text-sm text-muted-foreground">
                {companyDetails.phone_number}
              </p>
              <p className="font-body text-sm text-muted-foreground">
                {companyDetails.location}
              </p>
            </div>

            <p className="font-body text-xs text-muted-foreground text-center">
              Available for weddings, graduations & special events.
            </p>
          </div>

          {/* TikTok Card */}
          <div className={cardStyles}>
            <blockquote
              className="tiktok-embed"
              cite={companyDetails.tiktok_link || "https://www.tiktok.com/@silwal_photography"}
              data-unique-id="silwal_photography"
              data-embed-type="creator"
              style={{
                background: "#FFF",


                margin: 0,
                maxWidth: "100%",
                minWidth: "280px",
                padding: 0,
                width: "100%",
              }}
            >
              <div style={{ padding: "16px" }}>
                <a
                  href={companyDetails.tiktok_link || "https://www.tiktok.com/@silwal_photography?refer=creator_embed"}
                  style={{
                    background: "#FFFFFF",
                    lineHeight: 0,
                    padding: "0 0",
                    textAlign: "center",
                    textDecoration: "none",
                    width: "100%",
                    display: "block",
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <div
                      style={{
                        backgroundColor: "#F4F4F4",

                        flexGrow: 0,
                        height: "40px",
                        marginRight: "14px",
                        width: "40px",
                      }}
                    />
                    <div style={{ display: "flex", flexDirection: "column", flexGrow: 1, justifyContent: "center" }}>
                      <div
                        style={{
                          backgroundColor: "#F4F4F4",

                          flexGrow: 0,
                          height: "14px",
                          marginBottom: "6px",
                          width: "100px",
                        }}
                      />
                      <div
                        style={{
                          backgroundColor: "#F4F4F4",

                          flexGrow: 0,
                          height: "14px",
                          width: "60px",
                        }}
                      />
                    </div>
                  </div>
                  <div style={{ padding: "19% 0" }} />
                  <div style={{ display: "block", height: "50px", margin: "0 auto 12px", width: "50px" }}>
                    <svg width="50px" height="50px" viewBox="0 0 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg">
                      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                        <g fill="#000000">
                          <path d="M34.1451 0H26.0556V32.6956C26.0556 36.5913 22.9444 39.7913 19.0725 39.7913C15.2007 39.7913 12.0894 36.5913 12.0894 32.6956C12.0894 28.8696 15.1315 25.7391 18.8651 25.6V17.3913C10.6374 17.5304 4 24.2783 4 32.6956C4 41.1826 10.7756 48 19.1417 48C27.5078 48 34.2833 41.1131 34.2833 32.6956V15.9304C37.3255 18.1565 41.0591 19.4783 45 19.5478V11.3391C38.9157 11.1304 34.1451 6.12173 34.1451 0Z" />
                        </g>
                      </g>
                    </svg>
                  </div>
                  <div style={{ paddingTop: "8px" }}>
                    <div
                      style={{
                        color: "#000000",
                        fontFamily: "Arial,sans-serif",
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: 550,
                        lineHeight: "18px",
                      }}
                    >
                      View this profile on TikTok
                    </div>
                  </div>
                </a>
                <p
                  style={{
                    color: "#c9c8cd",
                    fontFamily: "Arial,sans-serif",
                    fontSize: "14px",
                    lineHeight: "17px",
                    marginBottom: 0,
                    marginTop: "8px",
                    overflow: "hidden",
                    padding: "8px 0 7px",
                    textAlign: "center",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  <a
                    href={companyDetails.tiktok_link || "https://www.tiktok.com/@silwal_photography"}
                    style={{
                      color: "#c9c8cd",
                      fontFamily: "Arial,sans-serif",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: "normal",
                      lineHeight: "17px",
                    }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    @silwal_photography
                  </a>
                </p>
              </div>
            </blockquote>
          </div>

        </div>

        {/* Footer bottom */}
        <div className="border-t border-border pt-8 flex flex-col items-center gap-4">

          <p className="font-body text-xs text-muted-foreground text-center">
            © {new Date().getFullYear()} Silwal Photography. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
