import {
  Button,
  Bold,
  Columns,
  Container,
  render,
  Text,
  VerticalSpace,
} from "@create-figma-plugin/ui";
import SaturationSlider from "./ui-components/SaturationSlider";
import LightnessSlider from "./ui-components/LightnessSlider";
import HueSlider from "./ui-components/HueSlider";
import { emit, on } from "@create-figma-plugin/utilities";
import { convertRgbColorToHexColor } from "@create-figma-plugin/utilities";
import { h, JSX } from "preact";
import { useState } from "preact/hooks";

function Plugin() {
  const [varData, setVarData]: any[] = useState([]);
  const [savedData, setSavedData]: any[] = useState([]);
  const [selectedColors, setSelectedColors]: any[] = useState([]);
  const [currentColors, setCurrentColors]: any[] = useState([]);

  //stages
  const [selectStage, setSelectStage] = useState(true);
  const [colorEditStage, setColorEditStage] = useState(false);

  //shift values
  const [hueShift, setHueShift] = useState("0");
  const [saturationShift, setSaturationShift] = useState("0");
  const [lightnessShift, setLightnessShift] = useState("0");

  const handleButtonClick = function () {
    setCurrentColors(selectedColors);
    setSelectStage(false);
    setColorEditStage(true);
  };
  function handleAddAll() {
    setSelectedColors(
      [...varData, ...selectedColors].sort((a: any, b: any) =>
        a.id.localeCompare(b.id)
      )
    );
    setVarData([]);
  }
  function handleReset() {
    setColorEditStage(false);
    setSelectStage(true);
    setSelectedColors([]);
    setHueShift("0");
    setSaturationShift("0");
    setLightnessShift("0");
    setVarData(savedData);
  }

  function handleApply() {
    emit("APPLY", currentColors);
  }

  function moveCard(element: any) {
    const isNotSelected = selectedColors.indexOf(element) === -1;
    if (isNotSelected) {
      setSelectedColors(
        [...selectedColors, element].sort((a, b) => a.id.localeCompare(b.id))
      );
      const filtered = varData.filter((item: any) => item.id !== element.id);
      setVarData(filtered);
    } else {
      setVarData(
        [...varData, element].sort((a, b) => a.id.localeCompare(b.id))
      );
      const filtered = selectedColors.filter(
        (item: any) => item.id !== element.id
      );
      setSelectedColors(filtered);
    }
  }

  const ColorCard = (element: any) => {
    let colorValues: any[] = [];
    let foundColor = "";
    if (element) {
      colorValues = Object.values(element.valuesByMode);
      if (colorValues.length === 1) {
        const newColor = convertRgbColorToHexColor(colorValues[0]);
        if (!newColor) return null;
        foundColor = "#" + newColor;
      }
    }

    return (
      <Container
        onClick={() => {
          moveCard(element);
        }}
        space="small"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "flex-end",
          backgroundColor: foundColor,
          height: "56px",
          width: "100%",
          padding: "8px",
          borderRadius: "8px",
        }}
      >
        {
          <div
            style={{
              backgroundColor: "#f5f5f5",
              borderRadius: "4px",
              padding: "4px",
              minWidth: "60px",
            }}
          >
            <Text align="center">
              <Bold>{element.name}</Bold>
            </Text>
          </div>
        }
      </Container>
    );
  };

  on("SET_VAR_DATA", (data) => {
    setVarData(data.sort((a: any, b: any) => a.id.localeCompare(b.id)));
    setSavedData(data.sort((a: any, b: any) => a.id.localeCompare(b.id)));
  });

  on("NEW_HUE", (data) => {
    setCurrentColors(data);
  });

  on("NEW_SATURATION", (data) => {
    setCurrentColors(data);
  });

  return (
    <Container space="medium" style={{ height: "100%", padding: "12px" }}>
      <div style={{ height: "100%", width: "100%", display: "flex" }}>
        {selectStage && (
          <Container
            class={"leftSide"}
            space="small"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              height: "100%",
              width: "100%",
              padding: "0",
            }}
          >
            <div
              class={"scrollWrapper"}
              style={{
                backgroundColor: "#ffffff",
                height: "100%",
                width: "100%",
                overflow: "auto",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  width: "100%",
                  padding: "0",
                }}
              >
                {selectedColors.map((element: any) => {
                  return ColorCard(element);
                })}
              </div>
            </div>
          </Container>
        )}
        {colorEditStage && (
          <div
            style={{
              display: "flex",
              gap: "4px",
              width: "100%",
              height: "100%",
            }}
          >
            <div
              class={"leftColorSample"}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                width: "100%",
                padding: "0",
              }}
            >
              {selectedColors.map((element: any) => {
                return ColorCard(element);
              })}
            </div>
            <div
              class={"rightColorSample"}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                width: "100%",
                padding: "0",
              }}
            >
              {currentColors.map((element: any) => {
                return ColorCard(element);
              })}
            </div>
          </div>
        )}
        <Container
          class={"rightSide"}
          space="small"
          style={{ height: "92%", width: "100%" }}
        >
          {selectStage && (
            <div
              class={"scrollWrapper"}
              style={{
                backgroundColor: "#ffffff",
                height: "100%",
                width: "100%",
                overflow: "auto",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  width: "100%",
                  padding: "0",
                }}
              >
                {varData.map((element: any) => {
                  return ColorCard(element);
                })}
              </div>
            </div>
          )}
          {colorEditStage && (
            <div
              class={"scrollWrapper"}
              style={{
                backgroundColor: "#ffffff",
                height: "100%",
                width: "100%",
                overflow: "auto",
                padding: "0 12px",
              }}
            >
              <VerticalSpace space="large" />
              {/* //!hue slider */}
              <Text>
                <Bold>Hue</Bold>
              </Text>
              <VerticalSpace space="small" />
              <HueSlider
                selectedColors={selectedColors}
                saturationShift={saturationShift}
                hueShift={hueShift}
                lightnessShift={lightnessShift}
                setHueShift={setHueShift}
              />
              <VerticalSpace space="small" />
              <VerticalSpace space="extraLarge" />
              {/* //!saturation slider */}
              <Text>
                <Bold>Saturation</Bold>
              </Text>
              <VerticalSpace space="small" />
              <SaturationSlider
                selectedColors={selectedColors}
                saturationShift={saturationShift}
                hueShift={hueShift}
                lightnessShift={lightnessShift}
                setSaturationShift={setSaturationShift}
              />
              <VerticalSpace space="small" />
              <VerticalSpace space="extraLarge" />
              {/* //!lightness slider */}
              <Text>
                <Bold>Lightness</Bold>
              </Text>
              <VerticalSpace space="small" />
              <LightnessSlider
                selectedColors={selectedColors}
                saturationShift={saturationShift}
                hueShift={hueShift}
                lightnessShift={lightnessShift}
                setLightnessShift={setLightnessShift}
              />
              <VerticalSpace space="small" />
            </div>
          )}
          <VerticalSpace space="small" />
          <Columns space="small" style={{ width: "100%" }}>
            <Button fullWidth onClick={handleReset} secondary>
              Reset
            </Button>
            {selectStage && (
              <Button fullWidth onClick={handleAddAll} secondary>
                Add All
              </Button>
            )}
            {selectStage && (
              <Button
                fullWidth
                onClick={handleButtonClick}
                secondary
                disabled={selectedColors.length === 0 ? true : false}
              >
                Next
              </Button>
            )}
            {colorEditStage && (
              <Button fullWidth onClick={handleApply} secondary>
                Apply
              </Button>
            )}
          </Columns>
        </Container>
      </div>
    </Container>
  );
}

export default render(Plugin);
