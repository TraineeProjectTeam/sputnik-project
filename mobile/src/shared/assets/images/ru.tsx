import Svg, { Path, G, Rect, Mask, Defs, ClipPath } from 'react-native-svg';

const RuFlag = () => {
  return (
    <Svg width="30px" height="20px" viewBox="0 -4 28 28" fill="none">
      <G clip-path="url(#clip0_503_2726)">
        <Rect
          x="0.25"
          y="0.25"
          width="27.5"
          height="19.5"
          rx="1.75"
          fill="white"
          stroke="#F5F5F5"
          stroke-width="0.5"
        />
        <Mask id="mask0_503_2726" maskUnits="userSpaceOnUse" x="0" y="0" width="28" height="20">
          <Rect
            x="0.25"
            y="0.25"
            width="27.5"
            height="19.5"
            rx="1.75"
            fill="white"
            stroke="white"
            stroke-width="0.5"
          />
        </Mask>
        <G mask="url(#mask0_503_2726)">
          <Path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M0 13.3333H28V6.66667H0V13.3333Z"
            fill="#0C47B7"
          />
          <Path fill-rule="evenodd" clip-rule="evenodd" d="M0 20H28V13.3333H0V20Z" fill="#E53B35" />
        </G>
      </G>
      <Defs>
        <ClipPath id="clip0_503_2726">
          <Rect width="28" height="20" rx="2" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default RuFlag;
