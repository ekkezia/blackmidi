'use client'

import { useNoteContext } from '@/app/contexts/note-context';
import { cn } from '@/utils/utils';
import * as React from "react";

interface SvgPianoProps {
  labels?: { [key: number]: {
    label: string;
    url: string;
    text: string;
  } };
}

const SvgPiano = ({
  labels = {},
  ...props
}: React.SVGProps<SVGSVGElement> & SvgPianoProps) => {
  const { notes, controller } = useNoteContext();

  return (  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={1144}
    height={768}
    viewBox="0 0 1144 768"
    fill="none"
    {...props}
  >
    <g filter="url(#piano_svg__a)">
      <rect width={1045.95} height={670} x={49} y={6} fill="#fff" rx={48.337} />
      <rect
        width={1045.95}
        height={670}
        x={49}
        y={6}
        fill="url(#piano_svg__b)"
        fillOpacity={0.08}
        rx={48.337}
        style={{
          mixBlendMode: "multiply",
        }}
      />
      <rect
        width={1045.95}
        height={670}
        x={49}
        y={6}
        fill="url(#piano_svg__c)"
        fillOpacity={0.1}
        rx={48.337}
        style={{
          mixBlendMode: "color-burn",
        }}
      />
      <path
        fill="#6D6D6D"
        d="M127.246 128.19V93.037h13.869q4 0 6.815 1.527 2.815 1.51 4.291 4.206 1.493 2.678 1.493 6.179t-1.51 6.179q-1.51 2.679-4.377 4.172-2.85 1.493-6.901 1.493h-8.84v-5.956h7.639q2.145 0 3.536-.738 1.407-.756 2.094-2.077.704-1.34.704-3.073 0-1.751-.704-3.055-.687-1.322-2.094-2.043-1.408-.738-3.571-.738h-5.012v29.077zm31.159 0v-26.365h7.312v26.365zm3.673-29.764q-1.63 0-2.798-1.081-1.15-1.1-1.15-2.626 0-1.51 1.15-2.592 1.167-1.1 2.798-1.099 1.63 0 2.781 1.099 1.167 1.08 1.167 2.592 0 1.528-1.167 2.626-1.15 1.08-2.781 1.081m17.015 30.262q-2.524 0-4.498-.875-1.974-.893-3.124-2.626-1.132-1.752-1.132-4.36 0-2.197.806-3.691a6.54 6.54 0 0 1 2.197-2.403q1.39-.91 3.159-1.373a24 24 0 0 1 3.742-.652 95 95 0 0 0 3.707-.447q1.409-.222 2.043-.652.635-.429.635-1.27v-.103q0-1.63-1.03-2.523-1.012-.893-2.884-.893-1.974 0-3.141.875-1.167.86-1.545 2.163l-6.763-.549q.516-2.403 2.026-4.154 1.51-1.768 3.896-2.712 2.403-.961 5.562-.961 2.197 0 4.205.515 2.026.514 3.588 1.596a7.76 7.76 0 0 1 2.489 2.781q.909 1.682.909 4.033v17.783h-6.934v-3.656h-.206a7.4 7.4 0 0 1-1.7 2.18q-1.064.927-2.557 1.459-1.494.515-3.45.515m2.094-5.046q1.613 0 2.849-.635 1.236-.653 1.94-1.751.704-1.099.704-2.489v-2.798q-.344.223-.944.412-.584.171-1.322.326-.738.137-1.476.258-.738.102-1.339.188-1.288.189-2.249.601-.961.413-1.493 1.116-.532.687-.532 1.716 0 1.494 1.081 2.283 1.098.773 2.781.773m25.739-10.694v15.242h-7.313v-26.365h6.969v4.652h.309a7.35 7.35 0 0 1 2.936-3.639q2.06-1.356 4.995-1.356 2.746 0 4.789 1.201t3.175 3.433q1.133 2.215 1.133 5.287v16.787h-7.312v-15.482q.017-2.421-1.236-3.777-1.253-1.373-3.45-1.373-1.476 0-2.609.635-1.116.636-1.751 1.854-.618 1.202-.635 2.901m34.669 15.757q-4 0-6.918-1.699-2.9-1.716-4.48-4.772-1.58-3.072-1.579-7.123 0-4.086 1.579-7.141 1.58-3.072 4.48-4.772 2.918-1.716 6.918-1.716t6.9 1.716q2.918 1.7 4.497 4.772 1.58 3.055 1.58 7.141 0 4.05-1.58 7.123-1.579 3.056-4.497 4.772-2.901 1.7-6.9 1.699m.034-5.664q1.82 0 3.038-1.03 1.22-1.047 1.837-2.849.635-1.803.635-4.103t-.635-4.102q-.618-1.803-1.837-2.85t-3.038-1.047q-1.836 0-3.09 1.047-1.236 1.047-1.871 2.85-.618 1.802-.618 4.102t.618 4.103q.636 1.802 1.871 2.849 1.254 1.03 3.09 1.03"
      />
      <path
        fill="#818181"
        d="M133.763 167.357q-2.07 0-3.672-.567-1.595-.561-2.69-1.655-1.095-1.089-1.662-2.671t-.567-3.611q0-1.976.574-3.551t1.669-2.684q1.101-1.114 2.676-1.702t3.578-.587q1.916 0 3.378.601 1.462.6 2.457 1.648 1 1.048 1.508 2.404.507 1.354.507 2.863 0 1.055-.133 2.063a6.7 6.7 0 0 1-.494 1.816 3.1 3.1 0 0 1-1.028 1.295q-.668.48-1.736.5a3.5 3.5 0 0 1-1.101-.133 2.25 2.25 0 0 1-.908-.494 1.47 1.47 0 0 1-.454-.881h-.08a2.05 2.05 0 0 1-.534.734q-.374.333-.954.534-.574.193-1.336.16a3.6 3.6 0 0 1-1.515-.38 3.5 3.5 0 0 1-1.155-.962 4.5 4.5 0 0 1-.727-1.455 6.5 6.5 0 0 1-.254-1.869q0-.988.287-1.769.288-.788.781-1.355a3.9 3.9 0 0 1 1.148-.908 4 4 0 0 1 1.369-.42 4.1 4.1 0 0 1 1.288.04q.588.12.975.367.393.246.494.541h.086v-.748h1.643v6.195q0 .526.273.894.28.367.795.367.608 0 .947-.447.347-.447.488-1.375.147-.928.147-2.377 0-1.014-.274-1.909a5.35 5.35 0 0 0-2.076-2.89 6 6 0 0 0-1.736-.814 7.5 7.5 0 0 0-2.142-.288q-1.596 0-2.837.494a5.6 5.6 0 0 0-2.096 1.409q-.849.922-1.289 2.209-.434 1.282-.434 2.878 0 1.662.448 2.95.447 1.281 1.321 2.163.875.88 2.163 1.335 1.288.46 2.971.46a8 8 0 0 0 1.468-.133q.721-.127 1.282-.294.567-.16.848-.26l.467 1.462a7 7 0 0 1-1.102.38 13 13 0 0 1-1.482.307q-.794.12-1.568.12m-.614-5.553q.867 0 1.395-.347.534-.348.767-1.035.241-.694.241-1.736-.007-1.014-.261-1.615-.246-.607-.774-.868-.52-.267-1.342-.267-.754 0-1.288.367a2.35 2.35 0 0 0-.808.995 3.5 3.5 0 0 0-.28 1.395q.006.808.227 1.522.227.708.734 1.148.514.441 1.389.441m14.994 2.042q-1.515 0-2.61-.647a4.4 4.4 0 0 1-1.682-1.836q-.588-1.188-.588-2.784 0-1.575.588-2.776.594-1.202 1.655-1.876 1.068-.674 2.497-.674a5 5 0 0 1 1.682.287q.814.286 1.462.901.648.614 1.021 1.595.374.975.374 2.37v.708h-8.15v-1.496h6.194q0-.788-.32-1.395a2.43 2.43 0 0 0-.901-.968q-.575-.354-1.349-.354-.841 0-1.468.414a2.8 2.8 0 0 0-.962 1.068q-.333.654-.333 1.422v1.168q0 1.029.36 1.749a2.6 2.6 0 0 0 1.021 1.102q.655.373 1.529.373.567 0 1.035-.16.467-.167.807-.494t.521-.807l1.889.34a3.4 3.4 0 0 1-.814 1.462 3.96 3.96 0 0 1-1.462.968q-.874.34-1.996.34m8.449-3.684-.013-2.437h.347l4.085-4.339h2.39l-4.659 4.94h-.314zm-1.835 3.477v-13.671h1.995v13.671zm6.475 0-3.672-4.873 1.375-1.395 4.746 6.268zm7.985.207q-1.515 0-2.61-.647a4.4 4.4 0 0 1-1.682-1.836q-.588-1.188-.588-2.784 0-1.575.588-2.776.594-1.202 1.655-1.876 1.068-.674 2.497-.674a5 5 0 0 1 1.682.287q.814.286 1.462.901.647.614 1.021 1.595.374.975.374 2.37v.708h-8.151v-1.496h6.195q0-.788-.32-1.395a2.4 2.4 0 0 0-.902-.968q-.573-.354-1.348-.354-.841 0-1.469.414a2.8 2.8 0 0 0-.961 1.068 3.1 3.1 0 0 0-.334 1.422v1.168q0 1.029.361 1.749a2.6 2.6 0 0 0 1.021 1.102q.654.373 1.529.373.567 0 1.035-.16.467-.167.807-.494t.521-.807l1.889.34a3.4 3.4 0 0 1-.814 1.462 3.96 3.96 0 0 1-1.462.968q-.874.34-1.996.34m6.4-.207v-1.368l5.554-7.056v-.093h-5.374v-1.736h7.864v1.455l-5.341 6.969v.094h5.527v1.735zm10.585 0v-10.253h1.996v10.253zm1.008-11.835a1.27 1.27 0 0 1-.894-.347 1.13 1.13 0 0 1-.368-.841q0-.494.368-.841.373-.354.894-.354.52 0 .888.354.374.347.374.841 0 .487-.374.841a1.25 1.25 0 0 1-.888.347m6.657 12.062q-.975 0-1.762-.36a3 3 0 0 1-1.249-1.062q-.453-.693-.453-1.702 0-.867.333-1.428.334-.561.901-.888a4.7 4.7 0 0 1 1.269-.494q.7-.167 1.428-.254l1.496-.173q.573-.074.834-.234.26-.16.26-.521v-.046q0-.875-.494-1.355-.488-.481-1.455-.481-1.007 0-1.589.447-.573.44-.794.982l-1.876-.428q.334-.935.975-1.508a3.95 3.95 0 0 1 1.488-.841 5.8 5.8 0 0 1 1.769-.267q.615 0 1.302.146a3.8 3.8 0 0 1 1.295.521q.608.38.995 1.088.387.7.387 1.823v6.808h-1.949v-1.401h-.08a2.9 2.9 0 0 1-.581.761q-.387.374-.995.62-.607.247-1.455.247m.434-1.602q.827 0 1.415-.327.594-.327.901-.854a2.2 2.2 0 0 0 .314-1.142v-1.321q-.107.106-.414.2a6 6 0 0 1-.687.153l-.755.114-.614.08a5 5 0 0 0-1.061.247q-.474.173-.761.501-.28.32-.281.854 0 .741.548 1.121.548.374 1.395.374"
      />
      <circle cx={129.561} cy={206.06} r={5.371} fill="#0AFF81" />
      <g filter="url(#piano_svg__d)">
        <circle cx={185.954} cy={206.06} r={5.371} fill="#818181" />
      </g>
      <g filter="url(#piano_svg__e)">
        <circle cx={234.291} cy={206.06} r={5.371} fill="#818181" />
      </g>
      <g filter="url(#piano_svg__f)">
        <circle cx={608.9} cy={145.639} r={64.449} fill="url(#piano_svg__g)" />
      </g>
      <g clipPath="url(#piano_svg__h)" data-figma-skip-parse="true">
        <foreignObject
          width={2221.24}
          height={2221.24}
          x={-1110.62}
          y={-1110.62}
          transform="matrix(.06982 -.02014 .02102 .07286 608.9 145.639)"
        >
          <svg
            xmlns="http://www.w3.org/1999/xhtml"
            style={{
              background:
                "conic-gradient(from 90deg,#d8d8d8 0deg,#f6f6f6 106.875deg,#ededed 187.5deg,#f6f6f6 281.25deg,#d8d8d8 360deg)",
              height: "100%",
              width: "100%",
              opacity: 1,
            }}
          />
        </foreignObject>
      </g>
      <ellipse
        cx={608.9}
        cy={145.639}
        data-figma-gradient-fill='{"type":"GRADIENT_ANGULAR","stops":[{"color":{"r":0.84705883264541626,"g":0.84705883264541626,"b":0.84705883264541626,"a":1.0},"position":0.0},{"color":{"r":0.96470588445663452,"g":0.96470588445663452,"b":0.96470588445663452,"a":1.0},"position":0.2968750},{"color":{"r":0.92941176891326904,"g":0.92941176891326904,"b":0.92941176891326904,"a":1.0},"position":0.52083331346511841},{"color":{"r":0.96470588445663452,"g":0.96470588445663452,"b":0.96470588445663452,"a":1.0},"position":0.781250}],"stopsVar":[],"transform":{"m00":139.63926696777344,"m01":42.031883239746094,"m02":518.06427001953125,"m10":-40.280555725097656,"m11":145.71054077148438,"m12":92.924324035644531},"opacity":1.0,"blendMode":"NORMAL","visible":true}'
        rx={64.449}
        ry={61.764}
      />
      <rect
        width={5.371}
        height={20.14}
        x={606.215}
        y={90.589}
        fill="#818181"
        rx={2.685}
      />
      <circle cx={540.423} cy={206.06} r={4.028} fill="#818181" />
      <circle cx={677.377} cy={206.06} r={4.028} fill="#818181" />
      <g filter="url(#piano_svg__i)">
        <circle
          cx={947.256}
          cy={145.639}
          r={64.449}
          fill="url(#piano_svg__j)"
        />
      </g>
      <g clipPath="url(#piano_svg__k)" data-figma-skip-parse="true">
        <foreignObject
          width={2221.24}
          height={2221.24}
          x={-1110.62}
          y={-1110.62}
          transform="matrix(.06982 -.02014 .02102 .07286 947.256 145.639)"
        >
          <svg
            xmlns="http://www.w3.org/1999/svg"
            style={{
              background:
                "conic-gradient(from 90deg,#d8d8d8 0deg,#f6f6f6 106.875deg,#ededed 187.5deg,#f6f6f6 281.25deg,#d8d8d8 360deg)",
              height: "100%",
              width: "100%",
              opacity: 1,
            }}
          />
        </foreignObject>
      </g>
      <g transform={`rotate(${controller.value % 360} 947.256 145.639)`}>
      <ellipse
        cx={947.256}
        cy={145.639}
        data-figma-gradient-fill='{"type":"GRADIENT_ANGULAR","stops":[{"color":{"r":0.84705883264541626,"g":0.84705883264541626,"b":0.84705883264541626,"a":1.0},"position":0.0},{"color":{"r":0.96470588445663452,"g":0.96470588445663452,"b":0.96470588445663452,"a":1.0},"position":0.2968750},{"color":{"r":0.92941176891326904,"g":0.92941176891326904,"b":0.92941176891326904,"a":1.0},"position":0.52083331346511841},{"color":{"r":0.96470588445663452,"g":0.96470588445663452,"b":0.96470588445663452,"a":1.0},"position":0.781250}],"stopsVar":[],"transform":{"m00":139.63926696777344,"m01":42.031883239746094,"m02":856.42089843750,"m10":-40.280555725097656,"m11":145.71054077148438,"m12":92.924324035644531},"opacity":1.0,"blendMode":"NORMAL","visible":true}'
        rx={64.449}
        ry={61.764}
      />
      <rect
        width={5.371}
        height={20.14}
        x={944.571}
        y={90.589}
        fill="#ff0000"
        rx={2.685}
      />
      </g>
      <circle cx={878.78} cy={206.06} r={4.028} fill="#818181" />
      <circle cx={1015.73} cy={206.06} r={4.028} fill="#818181" />
      <rect
        width={80.561}
        height={298.076}
        x={124.19}
        y={286.621}
        fill="#BFBFBF"
        rx={14.77}
      />
      <g clipPath="url(#piano_svg__l)">
        <path
          fill="#FCFCFC"
          d="M126.876 302.733c0-7.415 6.011-13.426 13.427-13.426h48.336c7.416 0 13.427 6.011 13.427 13.426v128.898a2.686 2.686 0 0 1-2.685 2.686h-69.82a2.686 2.686 0 0 1-2.685-2.686z"
        />
        <path
          fill="#F0F0F0"
          d="M126.876 305.419c0-7.416 6.012-13.427 13.427-13.427h48.337c7.415 0 13.427 6.011 13.427 13.427v126.212a2.687 2.687 0 0 1-2.686 2.686h-69.82a2.686 2.686 0 0 1-2.685-2.686z"
        />
        <g clipPath="url(#piano_svg__m)">
          <path fill="#818181" d="m164.471 357.784 8.056 8.056h-16.112z" />
        </g>
      </g>
      <g clipPath="url(#piano_svg__n)">
        <path
          fill="#FCFCFC"
          d="M126.876 568.585c0 7.416 6.011 13.427 13.427 13.427h48.336c7.416 0 13.427-6.011 13.427-13.427V439.687a2.685 2.685 0 0 0-2.685-2.685h-69.82a2.685 2.685 0 0 0-2.685 2.685z"
        />
        <path
          fill="#F0F0F0"
          d="M126.876 565.9c0 7.415 6.012 13.427 13.427 13.427h48.337c7.415 0 13.427-6.012 13.427-13.427V439.687a2.686 2.686 0 0 0-2.686-2.685h-69.82a2.685 2.685 0 0 0-2.685 2.685z"
        />
        <g clipPath="url(#piano_svg__o)">
          <path fill="#818181" d="m164.471 513.535 8.056-8.056h-16.112z" />
        </g>
      </g>
      <rect
        width={738.477}
        height={298.076}
        x={279.942}
        y={286.621}
        fill="#1A1A1A"
        rx={21.483}
      />
      <g filter="url(#piano_svg__p)"   
        id="key_48"
        className={cn("piano-key white", notes.includes(48) && 'active')}
        onClick={() => console.log('label')}
>

        <path
          fill="url(#piano_svg__q)"
          d="M285.313 308.104c0-8.898 7.213-16.112 16.112-16.112h83.246v271.222c0 8.899-7.213 16.113-16.112 16.113h-67.134c-8.899 0-16.112-7.214-16.112-16.113z"
          shapeRendering="crispEdges"
        />
        <path
          fill="url(#piano_svg__r)"
          d="M287.998 294.677h93.988v261.824c0 7.415-6.011 13.427-13.427 13.427h-67.134c-7.416 0-13.427-6.012-13.427-13.427z"
        />

{labels[48] &&        <text
            transform="translate(320, 550)"
            textAnchor="middle"
            fill="black"
            fontSize="18"
            pointerEvents="none"
          >
            {labels[48].label}
          </text>}
      </g>
      <g filter="url(#piano_svg__s)"
              id="key_50"
              className={cn("piano-key white", notes.includes(50) && 'active')}
      >
        <path
          fill="url(#piano_svg__t)"
          d="M390.042 291.992h99.359v271.222c0 8.899-7.214 16.113-16.112 16.113h-67.135c-8.898 0-16.112-7.214-16.112-16.113z"
          shapeRendering="crispEdges"
        />
        <path
          fill="url(#piano_svg__u)"
          d="M392.727 294.677h93.988v261.824c0 7.415-6.011 13.427-13.426 13.427h-67.135c-7.415 0-13.427-6.012-13.427-13.427z"
        />
      </g>
      <g filter="url(#piano_svg__v)"
              id="key_49"
              className={cn("piano-key black", notes.includes(49) && 'active')}  
              onClick={() => console.log('label')}    
      >
        <g clipPath="url(#piano_svg__w)"
        >
          <path
            fill="#3B3B3B"
            d="M365.874 289.307h42.966v147.695c0 7.415-6.012 13.427-13.427 13.427h-16.112c-7.416 0-13.427-6.012-13.427-13.427z"
          />
          <path
            fill="url(#piano_svg__x)"
            d="M368.559 289.307h37.595v139.639c0 7.415-6.011 13.427-13.427 13.427h-10.741c-7.415 0-13.427-6.012-13.427-13.427z"
          />
          {labels[49] &&        <text
            transform="translate(320, 550)"
            textAnchor="middle"
            fill="black"
            fontSize="18"
            pointerEvents="none"
          >
            {labels[49]?.label}
          </text>}

        </g>
        <path
          stroke="#171717"
          strokeWidth={2.685}
          d="M407.497 290.649v146.353c0 6.674-5.41 12.084-12.084 12.084h-16.112c-6.674 0-12.084-5.41-12.084-12.084V290.649z"
        />
      </g>
      <g filter="url(#piano_svg__y)"
                    id="key_52"
                    className={cn("piano-key white", notes.includes(52) && 'active')}  
                    onClick={() => console.log('label')}    
      >
        <path
          fill="url(#piano_svg__z)"
          d="M494.772 291.992h99.358v271.222c0 8.899-7.213 16.113-16.112 16.113h-67.134c-8.899 0-16.112-7.214-16.112-16.113z"
          shapeRendering="crispEdges"
        />
        <path
          fill="url(#piano_svg__A)"
          d="M497.457 294.677h93.988v261.824c0 7.415-6.011 13.427-13.427 13.427h-67.134c-7.416 0-13.427-6.012-13.427-13.427z"
        />
                  {labels[52] &&        <text
            transform="translate(320, 550)"
            textAnchor="middle"
            fill="black"
            fontSize="18"
            pointerEvents="none"
          >
            {labels[52]?.label}
          </text>}

      </g>
      <g filter="url(#piano_svg__B)"
      id="key_51"
      className={cn("piano-key black", notes.includes(51) && 'active')}  
      onClick={() => console.log('label')}
      >
        <g clipPath="url(#piano_svg__C)">
          <path
            fill="#3B3B3B"
            d="M470.603 289.307h42.966v147.695c0 7.415-6.011 13.427-13.427 13.427H484.03c-7.415 0-13.427-6.012-13.427-13.427z"
          />
          <path
            fill="url(#piano_svg__D)"
            d="M473.289 289.307h37.595v139.639c0 7.415-6.012 13.427-13.427 13.427h-10.742c-7.415 0-13.426-6.012-13.426-13.427z"
          />
        </g>
        <path
          stroke="#171717"
          strokeWidth={2.685}
          d="M512.226 290.649v146.353c0 6.674-5.41 12.084-12.084 12.084H484.03c-6.674 0-12.084-5.41-12.084-12.084V290.649z"
        />
      </g>
      <g filter="url(#piano_svg__E)"
      id="key_53"
      className={cn("piano-key white", notes.includes(53) && 'active')}  
      onClick={() => console.log('label')}
      >
        <path
          fill="url(#piano_svg__F)"
          d="M599.501 291.992h99.359v271.222c0 8.899-7.214 16.113-16.112 16.113h-67.135c-8.898 0-16.112-7.214-16.112-16.113z"
          shapeRendering="crispEdges"
        />
        <path
          fill="url(#piano_svg__G)"
          d="M602.186 294.677h93.988v261.824c0 7.415-6.011 13.427-13.426 13.427h-67.135c-7.415 0-13.427-6.012-13.427-13.427z"
        />
                  {labels[53] &&        <text
            transform="translate(320, 550)"
            textAnchor="middle"
            fill="black"
            fontSize="18"
            pointerEvents="none"
          >
            {labels[53]?.label}
          </text>}

      </g>
      <g filter="url(#piano_svg__H)"
      id="key_55"
      className={cn("piano-key white", notes.includes(55) && 'active')}  
      onClick={() => console.log('label')}
      >
        <path
          fill="url(#piano_svg__I)"
          d="M704.23 291.992h99.359v271.222c0 8.899-7.213 16.113-16.112 16.113h-67.134c-8.899 0-16.113-7.214-16.113-16.113z"
          shapeRendering="crispEdges"
        />
        <path
          fill="url(#piano_svg__J)"
          d="M706.916 294.677h93.988v261.824c0 7.415-6.012 13.427-13.427 13.427h-67.134c-7.416 0-13.427-6.012-13.427-13.427z"
        />
                          {labels[55] &&        <text
            transform="translate(320, 550)"
            textAnchor="middle"
            fill="black"
            fontSize="18"
            pointerEvents="none"
          >
            {labels[55]?.label}
          </text>}

      </g>
      <g filter="url(#piano_svg__K)"
      id="key_Gb3"
      className={cn("piano-key black", notes.includes(54) && 'active')}  
      onClick={() => console.log('label')} 
      >
        <g clipPath="url(#piano_svg__L)">
          <path
            fill="#3B3B3B"
            d="M680.062 289.307h42.966v147.695c0 7.415-6.011 13.427-13.427 13.427h-16.112c-7.415 0-13.427-6.012-13.427-13.427z"
          />
          <path
            fill="url(#piano_svg__M)"
            d="M682.748 289.307h37.595v139.639c0 7.415-6.012 13.427-13.427 13.427h-10.742c-7.415 0-13.426-6.012-13.426-13.427z"
          />
        </g>
        <path
          stroke="#171717"
          strokeWidth={2.685}
          d="M721.685 290.649v146.353c0 6.674-5.41 12.084-12.084 12.084h-16.112c-6.674 0-12.084-5.41-12.084-12.084V290.649z"
        />
                  {labels[54] &&        <text
            transform="translate(320, 550)"
            textAnchor="middle"
            fill="black"
            fontSize="18"
            pointerEvents="none"
          >
            {labels[54]?.label}
          </text>}

      </g>
      <g filter="url(#piano_svg__N)"
      id="key_57"
      className={cn("piano-key white", notes.includes(57) && 'active')}  
      onClick={() => console.log('label')}
      >
        <path
          fill="url(#piano_svg__O)"
          d="M808.96 291.992h99.359v271.222c0 8.899-7.214 16.113-16.113 16.113h-67.134c-8.898 0-16.112-7.214-16.112-16.113z"
          shapeRendering="crispEdges"
        />
        <path
          fill="url(#piano_svg__P)"
          d="M811.645 294.677h93.988v261.824c0 7.415-6.011 13.427-13.427 13.427h-67.134c-7.415 0-13.427-6.012-13.427-13.427z"
        />
                  {labels[57] &&        <text
            transform="translate(320, 550)"
            textAnchor="middle"
            fill="black"
            fontSize="18"
            pointerEvents="none"
          >
            {labels[57]?.label}
          </text>}

      </g>
      <g filter="url(#piano_svg__Q)"
      id="key_56"
      className={cn("piano-key black", notes.includes(56) && 'active')}  
      onClick={() => console.log('label')} 
      >
        <g clipPath="url(#piano_svg__R)">
          <path
            fill="#3B3B3B"
            d="M784.792 289.307h42.966v147.695c0 7.415-6.012 13.427-13.427 13.427h-16.113c-7.415 0-13.426-6.012-13.426-13.427z"
          />
          <path
            fill="url(#piano_svg__S)"
            d="M787.477 289.307h37.595v139.639c0 7.415-6.011 13.427-13.427 13.427h-10.741c-7.416 0-13.427-6.012-13.427-13.427z"
          />
        </g>
        <path
          stroke="#171717"
          strokeWidth={2.685}
          d="M826.415 290.649v146.353c0 6.674-5.41 12.084-12.084 12.084h-16.113c-6.673 0-12.084-5.41-12.084-12.084V290.649z"
        />
                  {labels[56] &&        <text
            transform="translate(320, 550)"
            textAnchor="middle"
            fill="black"
            fontSize="18"
            pointerEvents="none"
          >
            {labels[56]?.label}
          </text>}

      </g>
      <g filter="url(#piano_svg__T)"
      id="key_59"
      className={cn("piano-key white", notes.includes(59) && 'active')}  
      onClick={() => console.log('label')} 
      >
        <path
          fill="url(#piano_svg__U)"
          d="M913.689 291.992h83.247c8.894 0 16.114 7.214 16.114 16.112v255.11c0 8.899-7.22 16.113-16.114 16.113h-67.134c-8.899 0-16.113-7.214-16.113-16.113z"
          shapeRendering="crispEdges"
        />
        <path
          fill="url(#piano_svg__V)"
          d="M916.375 294.677h93.985v261.824c0 7.415-6.01 13.427-13.424 13.427h-67.134c-7.416 0-13.427-6.012-13.427-13.427z"
        />
                  {labels[59] &&        <text
            transform="translate(320, 550)"
            textAnchor="middle"
            fill="black"
            fontSize="18"
            pointerEvents="none"
          >
            {labels[59].label}
          </text>}

      </g>
      <g filter="url(#piano_svg__W)"
      id="key_58"
      className={cn("piano-key black", notes.includes(58) && 'active')}  
      onClick={() => console.log('label')} 
      >
        <g clipPath="url(#piano_svg__X)">
          <path
            fill="#3B3B3B"
            d="M889.521 289.307h42.966v147.695c0 7.415-6.011 13.427-13.427 13.427h-16.112c-7.415 0-13.427-6.012-13.427-13.427z"
          />
          <path
            fill="url(#piano_svg__Y)"
            d="M892.206 289.307h37.596v139.639c0 7.415-6.012 13.427-13.427 13.427h-10.742c-7.415 0-13.427-6.012-13.427-13.427z"
          />
        </g>
        <path
          stroke="#171717"
          strokeWidth={2.685}
          d="M931.144 290.649v146.353c0 6.674-5.41 12.084-12.084 12.084h-16.112c-6.674 0-12.084-5.41-12.084-12.084V290.649z"
        />
      </g>
      {labels[58] &&        <text
            x="50%" 
            y="90%" 
            textAnchor="middle"
            fill="black"
            fontSize="18"
            pointerEvents="none"
          >
            {labels[58].label}
          </text>}

    </g>
    <defs>
      <linearGradient
        id="piano_svg__g"
        x1={608.9}
        x2={608.9}
        y1={81.19}
        y2={210.088}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#fff" />
        <stop offset={1} stopColor="#D0D0D0" />
      </linearGradient>
      <linearGradient
        id="piano_svg__j"
        x1={947.256}
        x2={947.256}
        y1={81.19}
        y2={210.088}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#fff" />
        <stop offset={1} stopColor="#D0D0D0" />
      </linearGradient>
      <linearGradient
        id="piano_svg__q"
        x1={334.992}
        x2={334.992}
        y1={291.992}
        y2={579.327}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#fff" stopOpacity={0.85} />
        <stop offset={1} stopColor="#fff" />
      </linearGradient>
      <linearGradient
        id="piano_svg__r"
        x1={334.992}
        x2={334.992}
        y1={294.677}
        y2={569.928}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#DCDCDC" />
        <stop offset={1} stopColor="#F7F7F7" />
      </linearGradient>
      <linearGradient
        id="piano_svg__t"
        x1={439.721}
        x2={439.721}
        y1={291.992}
        y2={579.327}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#fff" stopOpacity={0.85} />
        <stop offset={1} stopColor="#fff" />
      </linearGradient>
      <linearGradient
        id="piano_svg__u"
        x1={439.721}
        x2={439.721}
        y1={294.677}
        y2={569.928}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#DCDCDC" />
        <stop offset={1} stopColor="#F7F7F7" />
      </linearGradient>
      <linearGradient
        id="piano_svg__x"
        x1={387.357}
        x2={387.357}
        y1={289.307}
        y2={442.373}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#121212" />
        <stop offset={1} stopColor="#232323" />
      </linearGradient>
      <linearGradient
        id="piano_svg__z"
        x1={544.451}
        x2={544.451}
        y1={291.992}
        y2={579.327}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#fff" stopOpacity={0.85} />
        <stop offset={1} stopColor="#fff" />
      </linearGradient>
      <linearGradient
        id="piano_svg__A"
        x1={544.451}
        x2={544.451}
        y1={294.677}
        y2={569.928}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#DCDCDC" />
        <stop offset={1} stopColor="#F7F7F7" />
      </linearGradient>
      <linearGradient
        id="piano_svg__D"
        x1={492.086}
        x2={492.086}
        y1={289.307}
        y2={442.373}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#121212" />
        <stop offset={1} stopColor="#232323" />
      </linearGradient>
      <linearGradient
        id="piano_svg__F"
        x1={649.18}
        x2={649.18}
        y1={291.992}
        y2={579.327}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#fff" stopOpacity={0.85} />
        <stop offset={1} stopColor="#fff" />
      </linearGradient>
      <linearGradient
        id="piano_svg__G"
        x1={649.18}
        x2={649.18}
        y1={294.677}
        y2={569.928}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#DCDCDC" />
        <stop offset={1} stopColor="#F7F7F7" />
      </linearGradient>
      <linearGradient
        id="piano_svg__I"
        x1={753.91}
        x2={753.91}
        y1={291.992}
        y2={579.327}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#fff" stopOpacity={0.85} />
        <stop offset={1} stopColor="#fff" />
      </linearGradient>
      <linearGradient
        id="piano_svg__J"
        x1={753.91}
        x2={753.91}
        y1={294.677}
        y2={569.928}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#DCDCDC" />
        <stop offset={1} stopColor="#F7F7F7" />
      </linearGradient>
      <linearGradient
        id="piano_svg__M"
        x1={701.545}
        x2={701.545}
        y1={289.307}
        y2={442.373}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#121212" />
        <stop offset={1} stopColor="#232323" />
      </linearGradient>
      <linearGradient
        id="piano_svg__O"
        x1={858.639}
        x2={858.639}
        y1={291.992}
        y2={579.327}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#fff" stopOpacity={0.85} />
        <stop offset={1} stopColor="#fff" />
      </linearGradient>
      <linearGradient
        id="piano_svg__P"
        x1={858.639}
        x2={858.639}
        y1={294.677}
        y2={569.928}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#DCDCDC" />
        <stop offset={1} stopColor="#F7F7F7" />
      </linearGradient>
      <linearGradient
        id="piano_svg__S"
        x1={806.275}
        x2={806.275}
        y1={289.307}
        y2={442.373}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#121212" />
        <stop offset={1} stopColor="#232323" />
      </linearGradient>
      <linearGradient
        id="piano_svg__U"
        x1={963.369}
        x2={963.369}
        y1={291.992}
        y2={579.327}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#fff" stopOpacity={0.85} />
        <stop offset={1} stopColor="#fff" />
      </linearGradient>
      <linearGradient
        id="piano_svg__V"
        x1={963.369}
        x2={963.369}
        y1={294.677}
        y2={569.928}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#DCDCDC" />
        <stop offset={1} stopColor="#F7F7F7" />
      </linearGradient>
      <linearGradient
        id="piano_svg__Y"
        x1={911.004}
        x2={911.004}
        y1={289.307}
        y2={442.373}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#121212" />
        <stop offset={1} stopColor="#232323" />
      </linearGradient>
      <filter
        id="piano_svg__a"
        width={1142.63}
        height={766.673}
        x={0.663}
        y={0.629}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy={42.966} />
        <feGaussianBlur stdDeviation={24.168} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_102_41" />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_102_41"
          result="shape"
        />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy={5.371} />
        <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
        <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" />
        <feBlend in2="shape" result="effect2_innerShadow_102_41" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy={-5.371} />
        <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
        <feBlend
          in2="effect2_innerShadow_102_41"
          result="effect3_innerShadow_102_41"
        />
      </filter>
      <filter
        id="piano_svg__d"
        width={10.742}
        height={10.742}
        x={180.584}
        y={200.689}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy={1.343} />
        <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.31 0" />
        <feBlend in2="shape" result="effect1_innerShadow_102_41" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy={-1.343} />
        <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
        <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0" />
        <feBlend
          in2="effect1_innerShadow_102_41"
          result="effect2_innerShadow_102_41"
        />
      </filter>
      <filter
        id="piano_svg__e"
        width={10.742}
        height={10.742}
        x={228.92}
        y={200.689}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy={1.343} />
        <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.31 0" />
        <feBlend in2="shape" result="effect1_innerShadow_102_41" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy={-1.343} />
        <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
        <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0" />
        <feBlend
          in2="effect1_innerShadow_102_41"
          result="effect2_innerShadow_102_41"
        />
      </filter>
      <filter
        id="piano_svg__f"
        width={209.459}
        height={209.459}
        x={504.17}
        y={70.449}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy={29.539} />
        <feGaussianBlur stdDeviation={20.14} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.24 0" />
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_102_41" />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_102_41"
          result="shape"
        />
      </filter>
      <filter
        id="piano_svg__i"
        width={209.459}
        height={209.459}
        x={842.527}
        y={70.449}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy={29.539} />
        <feGaussianBlur stdDeviation={20.14} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.24 0" />
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_102_41" />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_102_41"
          result="shape"
        />
      </filter>
      <filter
        id="piano_svg__p"
        width={179.92}
        height={367.896}
        x={245.032}
        y={262.453}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy={10.742} />
        <feGaussianBlur stdDeviation={20.14} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0" />
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_102_41" />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_102_41"
          result="shape"
        />
      </filter>
      <filter
        id="piano_svg__s"
        width={179.92}
        height={367.896}
        x={349.762}
        y={262.453}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy={10.742} />
        <feGaussianBlur stdDeviation={20.14} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0" />
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_102_41" />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_102_41"
          result="shape"
        />
      </filter>
      <filter
        id="piano_svg__v"
        width={75.19}
        height={193.347}
        x={349.762}
        y={289.307}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy={16.112} />
        <feGaussianBlur stdDeviation={8.056} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.23 0" />
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_102_41" />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_102_41"
          result="shape"
        />
      </filter>
      <filter
        id="piano_svg__y"
        width={179.92}
        height={367.896}
        x={454.491}
        y={262.453}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy={10.742} />
        <feGaussianBlur stdDeviation={20.14} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0" />
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_102_41" />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_102_41"
          result="shape"
        />
      </filter>
      <filter
        id="piano_svg__B"
        width={75.19}
        height={193.347}
        x={454.491}
        y={289.307}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy={16.112} />
        <feGaussianBlur stdDeviation={8.056} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.23 0" />
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_102_41" />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_102_41"
          result="shape"
        />
      </filter>
      <filter
        id="piano_svg__E"
        width={179.92}
        height={367.896}
        x={559.22}
        y={262.453}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy={10.742} />
        <feGaussianBlur stdDeviation={20.14} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0" />
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_102_41" />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_102_41"
          result="shape"
        />
      </filter>
      <filter
        id="piano_svg__H"
        width={179.92}
        height={367.896}
        x={663.95}
        y={262.453}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy={10.742} />
        <feGaussianBlur stdDeviation={20.14} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0" />
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_102_41" />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_102_41"
          result="shape"
        />
      </filter>
      <filter
        id="piano_svg__K"
        width={75.19}
        height={193.347}
        x={663.95}
        y={289.307}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy={16.112} />
        <feGaussianBlur stdDeviation={8.056} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.23 0" />
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_102_41" />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_102_41"
          result="shape"
        />
      </filter>
      <filter
        id="piano_svg__N"
        width={179.92}
        height={367.896}
        x={768.679}
        y={262.453}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy={10.742} />
        <feGaussianBlur stdDeviation={20.14} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0" />
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_102_41" />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_102_41"
          result="shape"
        />
      </filter>
      <filter
        id="piano_svg__Q"
        width={75.19}
        height={193.347}
        x={768.679}
        y={289.307}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy={16.112} />
        <feGaussianBlur stdDeviation={8.056} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.23 0" />
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_102_41" />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_102_41"
          result="shape"
        />
      </filter>
      <filter
        id="piano_svg__T"
        width={179.92}
        height={367.896}
        x={873.409}
        y={262.453}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy={10.742} />
        <feGaussianBlur stdDeviation={20.14} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0" />
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_102_41" />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_102_41"
          result="shape"
        />
      </filter>
      <filter
        id="piano_svg__W"
        width={75.19}
        height={193.347}
        x={873.409}
        y={289.307}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy={16.112} />
        <feGaussianBlur stdDeviation={8.056} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.23 0" />
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_102_41" />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_102_41"
          result="shape"
        />
      </filter>
      <clipPath id="piano_svg__h">
        <ellipse cx={608.9} cy={145.639} rx={64.449} ry={61.764} />
      </clipPath>
      <clipPath id="piano_svg__k">
        <ellipse cx={947.256} cy={145.639} rx={64.449} ry={61.764} />
      </clipPath>
      <clipPath id="piano_svg__l">
        <path
          fill="#fff"
          d="M126.876 302.733c0-7.415 6.011-13.426 13.427-13.426h48.336c7.416 0 13.427 6.011 13.427 13.426v128.898a2.686 2.686 0 0 1-2.685 2.686h-69.82a2.686 2.686 0 0 1-2.685-2.686z"
        />
      </clipPath>
      <clipPath id="piano_svg__m">
        <path fill="#fff" d="M148.359 347.042h32.224v32.224h-32.224z" />
      </clipPath>
      <clipPath id="piano_svg__n">
        <path
          fill="#fff"
          d="M126.876 568.585c0 7.416 6.011 13.427 13.427 13.427h48.336c7.416 0 13.427-6.011 13.427-13.427V439.687a2.685 2.685 0 0 0-2.685-2.685h-69.82a2.685 2.685 0 0 0-2.685 2.685z"
        />
      </clipPath>
      <clipPath id="piano_svg__o">
        <path fill="#fff" d="M148.359 524.276h32.224v-32.224h-32.224z" />
      </clipPath>
      <clipPath id="piano_svg__w">
        <path
          fill="#fff"
          d="M365.874 289.307h42.966v147.695c0 7.415-6.012 13.427-13.427 13.427h-16.112c-7.416 0-13.427-6.012-13.427-13.427z"
        />
      </clipPath>
      <clipPath id="piano_svg__C">
        <path
          fill="#fff"
          d="M470.603 289.307h42.966v147.695c0 7.415-6.011 13.427-13.427 13.427H484.03c-7.415 0-13.427-6.012-13.427-13.427z"
        />
      </clipPath>
      <clipPath id="piano_svg__L">
        <path
          fill="#fff"
          d="M680.062 289.307h42.966v147.695c0 7.415-6.011 13.427-13.427 13.427h-16.112c-7.415 0-13.427-6.012-13.427-13.427z"
        />
      </clipPath>
      <clipPath id="piano_svg__R">
        <path
          fill="#fff"
          d="M784.792 289.307h42.966v147.695c0 7.415-6.012 13.427-13.427 13.427h-16.113c-7.415 0-13.426-6.012-13.426-13.427z"
        />
      </clipPath>
      <clipPath id="piano_svg__X">
        <path
          fill="#fff"
          d="M889.521 289.307h42.966v147.695c0 7.415-6.011 13.427-13.427 13.427h-16.112c-7.415 0-13.427-6.012-13.427-13.427z"
        />
      </clipPath>
      <pattern
        id="piano_svg__b"
        width={1}
        height={1}
        patternContentUnits="objectBoundingBox"
      >
        <use
          xlinkHref="#piano_svg__Z"
          transform="matrix(.00098 0 0 .00152 0 -.02)"
        />
      </pattern>
      <pattern
        id="piano_svg__c"
        width={1}
        height={1}
        patternContentUnits="objectBoundingBox"
      >
        <use
          xlinkHref="#piano_svg__Z"
          transform="matrix(.00098 0 0 .00152 0 -.02)"
        />
      </pattern>
    </defs>
  </svg>
);}
export default SvgPiano;
