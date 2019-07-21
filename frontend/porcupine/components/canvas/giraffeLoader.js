import React, {useState, useEffect} from 'react';
// import styled, {keyframes} from 'styled-components';
import styled from 'styled-components';

import styles from '../../styles/giraffeLoader';

const GiraffeLoader = ({percent}) => {
  // set false for the moment, i.e. inactive
  // const [active, setActive] = useState(false);
  const [active] = useState(false);

  const nSteps = 30;
  const scale = percent == -1 ? nSteps + 1 : ((nSteps + 1) * percent) / 100;

  const StyledPolygon = styled.polygon`
    stroke: #464646;
    stroke-width: 20;
    stroke-miterlimit: 10;
    opacity: 1;
    fill-opacity: 0;
  `;

  useEffect(
      () => {
      // console.log({ percent });
        if (percent === -1) {
        // setActive(!active);
        }
      },
      // re-run the function when  value === 5
      [percent === -1]
  );

  return (
    active && (
      <div style={styles.container}>
        <svg
          viewBox="0 0 2973.3 2730"
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <style>
            {`
          .st0{fill:#FFC843;}
          .st1{fill:#F3B73F;}
          .st2{fill:#F6A71C;}
          .st3{fill:#E7A53B;}
          .st4{fill:#FFFFFF;}

          .fade-in { animation: 0.5s fade-in ease-in forwards; }

          @keyframes fade-in {
            to { fill-opacity:1; }
          `}
          </style>
          <g id="GiraffeTiles">
            <StyledPolygon
              className={`st0 ${scale > 1 ? 'fade-in' : ''}`}
              points="763.1,2442.2 1005.6,2441.9 692.4,2218.2"
            />
            <StyledPolygon
              className={`st0 ${scale > 2 ? 'fade-in' : ''}`}
              points="154.2,1900.4 528.7,1646.8 625.5,2009 533.9,2158.8"
            />
            <StyledPolygon
              className={`st0 ${scale > 3 ? 'fade-in' : ''}`}
              points="528.7,1646.8 780.6,1468.9 841.8,976.8 538.1,1364.5"
            />
            <StyledPolygon
              className={`st0 ${scale > 4 ? 'fade-in' : ''}`}
              points="1071,1880.5 1255.8,1390.8 785.6,1475.9"
            />
            <StyledPolygon
              className={`st0 ${scale > 5 ? 'fade-in' : ''}`}
              points={'1277.8,744.7 1233.8,435 1212.4,402 1111.3,388.8 ' +
              '1101.4,587.2'}
            />
            <StyledPolygon
              className={`st0 ${scale > 6 ? 'fade-in' : ''}`}
              points={'1330.1,576.7 1603.2,549.5 1668.2,657.2 1441.8,785.5 ' +
              '1403.1,690.5'}
            />
            <StyledPolygon
              className={`st0 ${scale > 7 ? 'fade-in' : ''}`}
              points="1983.4,906.1 1830,1072.5 2061.1,1096.2 2169.1,1043.7"
            />
            <StyledPolygon
              className={`st0 ${scale > 8 ? 'fade-in' : ''}`}
              points="763.1,2442.2 369.4,2427.6 625.5,2009"
            />
            <StyledPolygon
              className={`st0 ${scale > 9 ? 'fade-in' : ''}`}
              points="154.2,1900.4 538.1,1366.5 528.7,1646.8"
            />
            <StyledPolygon
              className={`st0 ${scale > 10 ? 'fade-in' : ''}`}
              points="528.7,1646.8 780.6,1469.9 1063,1882.5 625.5,2009"
            />
            <StyledPolygon
              className={`st1 ${scale > 11 ? 'fade-in' : ''}`}
              points={'990.7,780.4 1059.8,687.3 1167.2,645.9 1277.8,744.7 ' +
              '1263,1246.1 1177,1191.7'}
            />
            <StyledPolygon
              className={`st1 ${scale > 12 ? 'fade-in' : ''}`}
              points="1268.6,673.3 1277.8,744.7 1366.1,742.9"
            />
            <StyledPolygon
              className={`st1 ${scale > 13 ? 'fade-in' : ''}`}
              points={'1441.8,785.5 1470.5,856.5 1552.5,991.5 1830,1072.5 ' +
              '1759.6,782.1 1668.2,657.2 1441.8,785.5'}
            />
            <StyledPolygon
              className={`st1 ${scale > 14 ? 'fade-in' : ''}`}
              points={'1963.5,1276 2320.7,1319.6 2366.8,1242.6 2373.9,1190.5 ' +
              '2061.1,1097.2'}
            />
            <StyledPolygon
              className={`st1 ${scale > 15 ? 'fade-in' : ''}`}
              points="1406.9,567.4 1584.7,548.7 1423,495.3"
            />
            <StyledPolygon
              className={`st2 ${scale > 16 ? 'fade-in' : ''}`}
              points="369.4,2427.6 533.9,2158.8 154.2,1900.4"
            />
            <StyledPolygon
              className={`st2 ${scale > 17 ? 'fade-in' : ''}`}
              points="1005.6,2441.9 1070,1880.5 625.5,2009 692.4,2219.6"
            />
            <StyledPolygon
              className={`st2 ${scale > 18 ? 'fade-in' : ''}`}
              points="779.6,1469.9 844.8,985.8 1268.5,1250.3 1254.8,1390.8"
            />
            <StyledPolygon
              className={`st2 ${scale > 19 ? 'fade-in' : ''}`}
              points={'1277.8,744.7 1366.1,742.9 1403.1,690.5 1470.5,856.5 ' +
              '1552.5,991.5 1269.5,1025.6'}
            />
            <StyledPolygon
              className={`st2 ${scale > 20 ? 'fade-in' : ''}`}
              points={'1676.5,668.5 1759.6,782.1 1987.4,910.1 1934.2,837.4 ' +
              '1799,720.9'}
            />
            <StyledPolygon
              className={`st2 ${scale > 21 ? 'fade-in' : ''}`}
              points={'1275,1025.6 1409.8,1223 1502.8,1253.4 1830,1072.5 ' +
              '1552.5,991.5'}
            />
            <StyledPolygon
              className={`st2 ${scale > 22 ? 'fade-in' : ''}`}
              points="1502.8,1253.4 1963.5,1276 2061.1,1096.2 1830,1072.5"
            />
            <StyledPolygon
              className={`st2 ${scale > 23 ? 'fade-in' : ''}`}
              points="1418.1,372.2 1424.1,496.7 1622.4,556.7 1504,386.3"
            />
            <StyledPolygon
              className={`st3 ${scale > 24 ? 'fade-in' : ''}`}
              points="839.8,980.8 990.7,780.4 1177,1191.7 838.8,981.8"
            />
            <StyledPolygon
              className={`st3 ${scale > 25 ? 'fade-in' : ''}`}
              points="1269.5,1025.6 1409.8,1223 1255.8,1390.8"
            />
            <StyledPolygon
              className={`st3 ${scale > 26 ? 'fade-in' : ''}`}
              points="1233.8,435 1268.6,673.3 1366.1,742.9 1403.1,690.5"
            />
            <StyledPolygon
              className={`st3 ${scale > 27 ? 'fade-in' : ''}`}
              points="1603.2,554.7 1668.2,659.2 1803,726.9 1705,602.5"
            />
            <StyledPolygon
              className={`st3 ${scale > 28 ? 'fade-in' : ''}`}
              points="1830,1072.5 1983.4,908.1 1759.6,782.1"
            />
            <StyledPolygon
              className={`st3 ${scale > 29 ? 'fade-in' : ''}`}
              points="2061.1,1096.2 2171,1044.8 2375.9,1186.9"
            />
            <StyledPolygon
              className={`st3 ${scale > 30 ? 'fade-in' : ''}`}
              points={'1418.6,372.2 1396.1,299.3 1398.8,286.4 1455.8,237.8 ' +
              '1506.9,290.3 1510.8,301.1 1502.4,387.3'}
            />

            {/* Hides rough edges */}
            <polygon
              className="st4"
              points="154.2,1938.7 110.5,1946.9 124,1856.4 154.2,1875.1"
            />
            <polygon
              className="st4"
              points="2382.8,1199.8 2382.8,1169.1 2439.8,1218.8"
            />
            <polygon
              className="st4"
              points={'358.1,2426.7 362,2437.3 375.1,2437.8 374.3,2456.5 ' +
              '340.2,2436.2'}
            />
            <polygon
              className="st4"
              points="755.6,2451.9 776.7,2452.1 777.6,2453.2 755,2453"
            />
            <polygon
              className="st4"
              points="1464.9,1252.3 1508.1,1265 1462.6,1268.1"
            />
            <polygon
              className="st4"
              points={'1002.4,2451.9 1014.5,2451.9 1016.2,2437.1 ' +
              '1030.7,2441.5 1040.8,2453.7 1013.9,2464.9'}
            />
          </g>
        </svg>
      </div>
    )
  );
};
export default GiraffeLoader;
