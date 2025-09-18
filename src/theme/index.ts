import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          50: { value: "#e8f5f2" },
          100: { value: "#c2e6dc" },
          200: { value: "#8dd4c3" },
          300: { value: "#4bbfa3" },
          400: { value: "#1da688" },
          500: { value: "#027657" },
          600: { value: "#026549" },
          700: { value: "#02543b" },
          800: { value: "#01442f" },
          900: { value: "#013423" },
          950: { value: "#002319" }
        },

        accent: {
          50: { value: "#F8F2ED" },
          100: { value: "#F1E6DA" },
          200: { value: "#E1CCB7" },
          300: { value: "#D5B390" },
          400: { value: "#C7996B" },
          500: { value: "#B98046" },
          600: { value: "#815931" },
          700: { value: "#4D3319" },
          800: { value: "#271A0C" },
          900: { value: "#140D06" },
          950: { value: "#0A0603" }
        },

        success: {
          50: { value: "#e8f5e8" },
          100: { value: "#c8e6c8" },
          200: { value: "#a5d6a5" },
          300: { value: "#81c784" },
          400: { value: "#66bb6a" },
          500: { value: "#4caf50" },
          600: { value: "#43a047" },
          700: { value: "#388e3c" },
          800: { value: "#2e7d32" },
          900: { value: "#1b5e20" },
          950: { value: "#0f3f14" }
        },

        warning: {
          50: { value: "#fff8e1" },
          100: { value: "#ffecb3" },
          200: { value: "#ffe082" },
          300: { value: "#ffd54f" },
          400: { value: "#ffca28" },
          500: { value: "#ffc107" },
          600: { value: "#ffb300" },
          700: { value: "#ffa000" },
          800: { value: "#ff8f00" },
          900: { value: "#ff6f00" },
          950: { value: "#cc5600" }
        },

        error: {
          50: { value: "#ffebee" },
          100: { value: "#ffcdd2" },
          200: { value: "#ef9a9a" },
          300: { value: "#e57373" },
          400: { value: "#ef5350" },
          500: { value: "#f44336" },
          600: { value: "#e53935" },
          700: { value: "#d32f2f" },
          800: { value: "#c62828" },
          900: { value: "#b71c1c" },
          950: { value: "#8b1538" }
        }
      }
    },

    semanticTokens: {
      colors: {
        "color-palette": {
          "50": { value: "{colors.brand.50}" },
          "100": { value: "{colors.brand.100}" },
          "200": { value: "{colors.brand.200}" },
          "300": { value: "{colors.brand.300}" },
          "400": { value: "{colors.brand.400}" },
          "500": { value: "{colors.brand.500}" },
          "600": { value: "{colors.brand.600}" },
          "700": { value: "{colors.brand.700}" },
          "800": { value: "{colors.brand.800}" },
          "900": { value: "{colors.brand.900}" },
          "950": { value: "{colors.brand.950}" },

          "solid": { value: "{colors.brand.500}" },
          "contrast": { value: "white" },
          "fg": { value: "{colors.brand.700}" },
          "muted": { value: "{colors.brand.100}" },
          "subtle": { value: "{colors.brand.50}" },
          "emphasized": { value: "{colors.brand.600}" },
          "focusRing": { value: "{colors.brand.500}" }
        },

        bg: {
          "canvas": {
            value: { base: "white", _dark: "gray.900" }
          },
          "subtle": {
            value: { base: "gray.50", _dark: "gray.800" }
          }
        }
      }
    },

    recipes: {
      button: {
        base: {
          fontWeight: "medium",
          borderRadius: "full"
        },
        variants: {
          variant: {
            solid: {
              bg: "brand.500",
              color: "white",
              _hover: {
                bg: "brand.600"
              },
              _active: {
                bg: "brand.700"
              }
            },
            outline: {
              borderRadius: "full",
              color: "fg",
              borderColor: "bg.muted",
              _hover: {
                bg: "bg.muted"
              }
            },
            subtle: {
              bg: "bg.muted",
              color: "fg",
              borderRadius: "full",
              _hover: {
                bg: "bg.emphasized"
              }
            }
          }
        }
      },

      input: {
        base: {
          borderRadius: "full",
          fontWeight: "semibold"
        }
      },

      text: {
        base: {
          lineHeight: 1.2
        }
      }
    }
  }
})

export const system = createSystem(defaultConfig, config)
