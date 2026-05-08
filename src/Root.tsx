import React from "react";
import { Composition } from "remotion";
import { AgenciaLMC } from "./compositions/AgenciaLMC";
import { SocialPost } from "./compositions/SocialPost";

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="AgenciaLMC"
        component={AgenciaLMC}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          title: "LMC Agência de Marketing Digital",
          subtitle: "Estratégia. Criatividade. Resultados.",
          location: "Fortaleza, CE",
        }}
      />
      <Composition
        id="SocialPost"
        component={SocialPost}
        durationInFrames={90}
        fps={30}
        width={1080}
        height={1080}
        defaultProps={{
          message: "Transforme sua presença digital com a LMC!",
          cta: "Entre em contato",
        }}
      />
    </>
  );
};
