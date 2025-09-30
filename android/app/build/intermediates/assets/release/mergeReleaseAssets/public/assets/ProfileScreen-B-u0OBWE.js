var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { $ as $b5e257d569688ac6$export$535bd6ca7f90a273, z as $bdb11010cef70236$export$f680877a34711e37, A as tv, D as $65484d02dcb7eb3e$export$457c3d6518dd4c6f, F as $3ef42575df84b30b$export$9d1611c77c2fe928, H as useProviderContext, J as mapPropsVariants, K as useDOMRef, L as clsx, N as objectToDeps, Q as clampPercentage, T as dataAttr, U as forwardRef, j as jsxRuntimeExports, V as createLucideIcon, k as useLanguage, l as useAuth, W as Dialog, X as DialogContent, Y as DialogHeader, Z as DialogTitle, _ as Label, O as OptimizedInput, a0 as EyeOff, E as Eye, B as Button, a1 as LoaderCircle, t as toast, x as supabase, a2 as Avatar, a3 as AvatarImage, a4 as AvatarFallback, P as Primitive, i as cn, a5 as useLanguage$1, a6 as useToast, a7 as Tabs, a8 as TabsList, a9 as TabsTrigger, aa as Shield, ab as Settings, ac as TriangleAlert, ad as Database, ae as TabsContent, S as SemipolarSpinner, C as Card, p as CardContent, af as RefreshCw, n as CardHeader, o as CardTitle, ag as CircleCheckBig, v as Badge, ah as CardDescription, ai as Slider, aj as Trash2, ak as MessageSquare, al as ScrollArea, q as Info, am as useUserRole, an as Jt, ao as Users, ap as Crown, aq as UserCheck, ar as Bell, as as Search, at as DialogTrigger, au as UserPlus, av as testPushNotifications, aw as XPService, ax as FileText, ay as Lock, az as Share2, aA as Send, r as Clock, aB as MessageCircle, aC as DialogDescription, aD as useTypedLanguage, aE as motion, aF as realtimeService, aG as UserRoleBadge, aH as ChevronRight, M as MapPin, aI as Target, aJ as AlertRadiusDialog } from "./index-CZYVfY9K.js";
import { r as reactExports, R as React, u as useNavigate } from "./vendor-CYUu28OS.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem, e as Switch, H as Heart, f as SquarePen } from "./select-Otq6mO8S.js";
import { D as DropdownMenu, a as DropdownMenuTrigger, E as EllipsisVertical, b as DropdownMenuContent, c as DropdownMenuItem } from "./dropdown-menu-D_fKQ3sK.js";
import { A as ArrowLeft } from "./arrow-left-BjTckGNp.js";
import { C as CircleX, P as Phone, a as Calendar } from "./phone-poxpY5Wz.js";
import { P as Plus } from "./plus-B7vZspfX.js";
import { S as Star } from "./star-ah6ajVvg.js";
import "./check-CPZybvMl.js";
import "./circle-vE8yasc-.js";
const $148a7a147e38ea7f$var$RTL_SCRIPTS = /* @__PURE__ */ new Set([
  "Arab",
  "Syrc",
  "Samr",
  "Mand",
  "Thaa",
  "Mend",
  "Nkoo",
  "Adlm",
  "Rohg",
  "Hebr"
]);
const $148a7a147e38ea7f$var$RTL_LANGS = /* @__PURE__ */ new Set([
  "ae",
  "ar",
  "arc",
  "bcc",
  "bqi",
  "ckb",
  "dv",
  "fa",
  "glk",
  "he",
  "ku",
  "mzn",
  "nqo",
  "pnb",
  "ps",
  "sd",
  "ug",
  "ur",
  "yi"
]);
function $148a7a147e38ea7f$export$702d680b21cbd764(localeString) {
  if (Intl.Locale) {
    let locale = new Intl.Locale(localeString).maximize();
    let textInfo = typeof locale.getTextInfo === "function" ? locale.getTextInfo() : locale.textInfo;
    if (textInfo) return textInfo.direction === "rtl";
    if (locale.script) return $148a7a147e38ea7f$var$RTL_SCRIPTS.has(locale.script);
  }
  let lang = localeString.split("-")[0];
  return $148a7a147e38ea7f$var$RTL_LANGS.has(lang);
}
const $1e5a04cdaf7d1af8$var$localeSymbol = Symbol.for("react-aria.i18n.locale");
function $1e5a04cdaf7d1af8$export$f09106e7c6677ec5() {
  let locale = typeof window !== "undefined" && window[$1e5a04cdaf7d1af8$var$localeSymbol] || typeof navigator !== "undefined" && (navigator.language || navigator.userLanguage) || "en-US";
  try {
    Intl.DateTimeFormat.supportedLocalesOf([
      locale
    ]);
  } catch {
    locale = "en-US";
  }
  return {
    locale,
    direction: $148a7a147e38ea7f$export$702d680b21cbd764(locale) ? "rtl" : "ltr"
  };
}
let $1e5a04cdaf7d1af8$var$currentLocale = $1e5a04cdaf7d1af8$export$f09106e7c6677ec5();
let $1e5a04cdaf7d1af8$var$listeners = /* @__PURE__ */ new Set();
function $1e5a04cdaf7d1af8$var$updateLocale() {
  $1e5a04cdaf7d1af8$var$currentLocale = $1e5a04cdaf7d1af8$export$f09106e7c6677ec5();
  for (let listener of $1e5a04cdaf7d1af8$var$listeners) listener($1e5a04cdaf7d1af8$var$currentLocale);
}
function $1e5a04cdaf7d1af8$export$188ec29ebc2bdc3a() {
  let isSSR = $b5e257d569688ac6$export$535bd6ca7f90a273();
  let [defaultLocale, setDefaultLocale] = reactExports.useState($1e5a04cdaf7d1af8$var$currentLocale);
  reactExports.useEffect(() => {
    if ($1e5a04cdaf7d1af8$var$listeners.size === 0) window.addEventListener("languagechange", $1e5a04cdaf7d1af8$var$updateLocale);
    $1e5a04cdaf7d1af8$var$listeners.add(setDefaultLocale);
    return () => {
      $1e5a04cdaf7d1af8$var$listeners.delete(setDefaultLocale);
      if ($1e5a04cdaf7d1af8$var$listeners.size === 0) window.removeEventListener("languagechange", $1e5a04cdaf7d1af8$var$updateLocale);
    };
  }, []);
  if (isSSR) return {
    locale: "en-US",
    direction: "ltr"
  };
  return defaultLocale;
}
const $18f2051aff69b9bf$var$I18nContext = /* @__PURE__ */ React.createContext(null);
function $18f2051aff69b9bf$export$43bb16f9c6d9e3f7() {
  let defaultLocale = $1e5a04cdaf7d1af8$export$188ec29ebc2bdc3a();
  let context = reactExports.useContext($18f2051aff69b9bf$var$I18nContext);
  return context || defaultLocale;
}
function $313b98861ee5dd6c$export$d6875122194c7b44(props, defaultLabel) {
  let { id, "aria-label": label, "aria-labelledby": labelledBy } = props;
  id = $bdb11010cef70236$export$f680877a34711e37(id);
  if (labelledBy && label) {
    let ids = /* @__PURE__ */ new Set([
      id,
      ...labelledBy.trim().split(/\s+/)
    ]);
    labelledBy = [
      ...ids
    ].join(" ");
  } else if (labelledBy) labelledBy = labelledBy.trim().split(/\s+/).join(" ");
  if (!label && !labelledBy && defaultLabel) label = defaultLabel;
  return {
    id,
    "aria-label": label,
    "aria-labelledby": labelledBy
  };
}
function $9446cca9a3875146$export$7d15b64cf5a3a4c4(value, min = -Infinity, max = Infinity) {
  let newValue = Math.min(Math.max(value, min), max);
  return newValue;
}
let $488c6ddbf4ef74c2$var$formatterCache = /* @__PURE__ */ new Map();
let $488c6ddbf4ef74c2$var$supportsSignDisplay = false;
try {
  $488c6ddbf4ef74c2$var$supportsSignDisplay = new Intl.NumberFormat("de-DE", {
    signDisplay: "exceptZero"
  }).resolvedOptions().signDisplay === "exceptZero";
} catch {
}
let $488c6ddbf4ef74c2$var$supportsUnit = false;
try {
  $488c6ddbf4ef74c2$var$supportsUnit = new Intl.NumberFormat("de-DE", {
    style: "unit",
    unit: "degree"
  }).resolvedOptions().style === "unit";
} catch {
}
const $488c6ddbf4ef74c2$var$UNITS = {
  degree: {
    narrow: {
      default: "°",
      "ja-JP": " 度",
      "zh-TW": "度",
      "sl-SI": " °"
    }
  }
};
class $488c6ddbf4ef74c2$export$cc77c4ff7e8673c5 {
  /** Formats a number value as a string, according to the locale and options provided to the constructor. */
  format(value) {
    let res = "";
    if (!$488c6ddbf4ef74c2$var$supportsSignDisplay && this.options.signDisplay != null) res = $488c6ddbf4ef74c2$export$711b50b3c525e0f2(this.numberFormatter, this.options.signDisplay, value);
    else res = this.numberFormatter.format(value);
    if (this.options.style === "unit" && !$488c6ddbf4ef74c2$var$supportsUnit) {
      var _UNITS_unit;
      let { unit, unitDisplay = "short", locale } = this.resolvedOptions();
      if (!unit) return res;
      let values = (_UNITS_unit = $488c6ddbf4ef74c2$var$UNITS[unit]) === null || _UNITS_unit === void 0 ? void 0 : _UNITS_unit[unitDisplay];
      res += values[locale] || values.default;
    }
    return res;
  }
  /** Formats a number to an array of parts such as separators, digits, punctuation, and more. */
  formatToParts(value) {
    return this.numberFormatter.formatToParts(value);
  }
  /** Formats a number range as a string. */
  formatRange(start, end) {
    if (typeof this.numberFormatter.formatRange === "function") return this.numberFormatter.formatRange(start, end);
    if (end < start) throw new RangeError("End date must be >= start date");
    return `${this.format(start)} – ${this.format(end)}`;
  }
  /** Formats a number range as an array of parts. */
  formatRangeToParts(start, end) {
    if (typeof this.numberFormatter.formatRangeToParts === "function") return this.numberFormatter.formatRangeToParts(start, end);
    if (end < start) throw new RangeError("End date must be >= start date");
    let startParts = this.numberFormatter.formatToParts(start);
    let endParts = this.numberFormatter.formatToParts(end);
    return [
      ...startParts.map((p) => ({
        ...p,
        source: "startRange"
      })),
      {
        type: "literal",
        value: " – ",
        source: "shared"
      },
      ...endParts.map((p) => ({
        ...p,
        source: "endRange"
      }))
    ];
  }
  /** Returns the resolved formatting options based on the values passed to the constructor. */
  resolvedOptions() {
    let options = this.numberFormatter.resolvedOptions();
    if (!$488c6ddbf4ef74c2$var$supportsSignDisplay && this.options.signDisplay != null) options = {
      ...options,
      signDisplay: this.options.signDisplay
    };
    if (!$488c6ddbf4ef74c2$var$supportsUnit && this.options.style === "unit") options = {
      ...options,
      style: "unit",
      unit: this.options.unit,
      unitDisplay: this.options.unitDisplay
    };
    return options;
  }
  constructor(locale, options = {}) {
    this.numberFormatter = $488c6ddbf4ef74c2$var$getCachedNumberFormatter(locale, options);
    this.options = options;
  }
}
function $488c6ddbf4ef74c2$var$getCachedNumberFormatter(locale, options = {}) {
  let { numberingSystem } = options;
  if (numberingSystem && locale.includes("-nu-")) {
    if (!locale.includes("-u-")) locale += "-u-";
    locale += `-nu-${numberingSystem}`;
  }
  if (options.style === "unit" && !$488c6ddbf4ef74c2$var$supportsUnit) {
    var _UNITS_unit;
    let { unit, unitDisplay = "short" } = options;
    if (!unit) throw new Error('unit option must be provided with style: "unit"');
    if (!((_UNITS_unit = $488c6ddbf4ef74c2$var$UNITS[unit]) === null || _UNITS_unit === void 0 ? void 0 : _UNITS_unit[unitDisplay])) throw new Error(`Unsupported unit ${unit} with unitDisplay = ${unitDisplay}`);
    options = {
      ...options,
      style: "decimal"
    };
  }
  let cacheKey = locale + (options ? Object.entries(options).sort((a, b) => a[0] < b[0] ? -1 : 1).join() : "");
  if ($488c6ddbf4ef74c2$var$formatterCache.has(cacheKey)) return $488c6ddbf4ef74c2$var$formatterCache.get(cacheKey);
  let numberFormatter = new Intl.NumberFormat(locale, options);
  $488c6ddbf4ef74c2$var$formatterCache.set(cacheKey, numberFormatter);
  return numberFormatter;
}
function $488c6ddbf4ef74c2$export$711b50b3c525e0f2(numberFormat, signDisplay, num) {
  if (signDisplay === "auto") return numberFormat.format(num);
  else if (signDisplay === "never") return numberFormat.format(Math.abs(num));
  else {
    let needsPositiveSign = false;
    if (signDisplay === "always") needsPositiveSign = num > 0 || Object.is(num, 0);
    else if (signDisplay === "exceptZero") {
      if (Object.is(num, -0) || Object.is(num, 0)) num = Math.abs(num);
      else needsPositiveSign = num > 0;
    }
    if (needsPositiveSign) {
      let negative = numberFormat.format(-num);
      let noSign = numberFormat.format(num);
      let minus = negative.replace(noSign, "").replace(/\u200e|\u061C/, "");
      if ([
        ...minus
      ].length !== 1) console.warn("@react-aria/i18n polyfill for NumberFormat signDisplay: Unsupported case");
      let positive = negative.replace(noSign, "!!!").replace(minus, "+").replace("!!!", noSign);
      return positive;
    } else return numberFormat.format(num);
  }
}
function $a916eb452884faea$export$b7a616150fdb9f44(options = {}) {
  let { locale } = $18f2051aff69b9bf$export$43bb16f9c6d9e3f7();
  return reactExports.useMemo(() => new $488c6ddbf4ef74c2$export$cc77c4ff7e8673c5(locale, options), [
    locale,
    options
  ]);
}
var progress = tv(
  {
    slots: {
      base: "flex flex-col gap-2 w-full",
      label: "",
      labelWrapper: "flex justify-between",
      value: "",
      track: "z-0 relative bg-default-300/50 overflow-hidden rtl:rotate-180",
      indicator: "h-full"
    },
    variants: {
      color: {
        default: {
          indicator: "bg-default-400"
        },
        primary: {
          indicator: "bg-primary"
        },
        secondary: {
          indicator: "bg-secondary"
        },
        success: {
          indicator: "bg-success"
        },
        warning: {
          indicator: "bg-warning"
        },
        danger: {
          indicator: "bg-danger"
        }
      },
      size: {
        sm: {
          label: "text-small",
          value: "text-small",
          track: "h-1"
        },
        md: {
          label: "text-medium",
          value: "text-medium",
          track: "h-3"
        },
        lg: {
          label: "text-large",
          value: "text-large",
          track: "h-5"
        }
      },
      radius: {
        none: {
          track: "rounded-none",
          indicator: "rounded-none"
        },
        sm: {
          track: "rounded-small",
          indicator: "rounded-small"
        },
        md: {
          track: "rounded-medium",
          indicator: "rounded-medium"
        },
        lg: {
          track: "rounded-large",
          indicator: "rounded-large"
        },
        full: {
          track: "rounded-full",
          indicator: "rounded-full"
        }
      },
      isStriped: {
        true: {
          indicator: "bg-stripe-gradient-default bg-stripe-size"
        }
      },
      isIndeterminate: {
        true: {
          indicator: ["absolute", "w-full", "origin-left", "animate-indeterminate-bar"]
        }
      },
      isDisabled: {
        true: {
          base: "opacity-disabled cursor-not-allowed"
        }
      },
      disableAnimation: {
        true: {},
        false: {
          indicator: "transition-transform !duration-500"
        }
      }
    },
    defaultVariants: {
      color: "primary",
      size: "md",
      radius: "full",
      isStriped: false,
      isIndeterminate: false,
      isDisabled: false
    },
    compoundVariants: [
      // disableAnimation && !isIndeterminate
      {
        disableAnimation: true,
        isIndeterminate: false,
        class: {
          indicator: "!transition-none motion-reduce:transition-none"
        }
      },
      {
        color: "primary",
        isStriped: true,
        class: {
          indicator: "bg-stripe-gradient-primary bg-stripe-size"
        }
      },
      {
        color: "secondary",
        isStriped: true,
        class: {
          indicator: "bg-stripe-gradient-secondary bg-stripe-size"
        }
      },
      {
        color: "success",
        isStriped: true,
        class: {
          indicator: "bg-stripe-gradient-success bg-stripe-size"
        }
      },
      {
        color: "warning",
        isStriped: true,
        class: {
          indicator: "bg-stripe-gradient-warning bg-stripe-size"
        }
      },
      {
        color: "danger",
        isStriped: true,
        class: {
          indicator: "bg-stripe-gradient-danger bg-stripe-size"
        }
      }
    ]
  },
  {
    twMerge: true
  }
);
tv({
  slots: {
    base: "flex flex-col justify-center gap-1 max-w-fit items-center",
    label: "",
    svgWrapper: "relative block",
    svg: "z-0 relative overflow-hidden",
    track: "h-full stroke-default-300/50",
    indicator: "h-full stroke-current",
    value: "absolute font-normal inset-0 flex items-center justify-center"
  },
  variants: {
    color: {
      default: {
        svg: "text-default-400"
      },
      primary: {
        svg: "text-primary"
      },
      secondary: {
        svg: "text-secondary"
      },
      success: {
        svg: "text-success"
      },
      warning: {
        svg: "text-warning"
      },
      danger: {
        svg: "text-danger"
      }
    },
    size: {
      sm: {
        svg: "w-8 h-8",
        label: "text-small",
        value: "text-[0.5rem]"
      },
      md: {
        svg: "w-10 h-10",
        label: "text-small",
        value: "text-[0.55rem]"
      },
      lg: {
        svg: "w-12 h-12",
        label: "text-medium",
        value: "text-[0.6rem]"
      }
    },
    isIndeterminate: {
      true: {
        svg: "animate-spinner-ease-spin"
      }
    },
    isDisabled: {
      true: {
        base: "opacity-disabled cursor-not-allowed"
      }
    },
    disableAnimation: {
      true: {},
      false: {
        indicator: "transition-all !duration-500"
      }
    }
  },
  defaultVariants: {
    color: "primary",
    size: "md",
    isDisabled: false
  },
  compoundVariants: [
    // disableAnimation && !isIndeterminate
    {
      disableAnimation: true,
      isIndeterminate: false,
      class: {
        svg: "!transition-none motion-reduce:transition-none"
      }
    }
  ]
});
function $d191a55c9702f145$export$8467354a121f1b9f(props) {
  let { id, label, "aria-labelledby": ariaLabelledby, "aria-label": ariaLabel, labelElementType = "label" } = props;
  id = $bdb11010cef70236$export$f680877a34711e37(id);
  let labelId = $bdb11010cef70236$export$f680877a34711e37();
  let labelProps = {};
  if (label) {
    ariaLabelledby = ariaLabelledby ? `${labelId} ${ariaLabelledby}` : labelId;
    labelProps = {
      id: labelId,
      htmlFor: labelElementType === "label" ? id : void 0
    };
  } else if (!ariaLabelledby && !ariaLabel && false) console.warn("If you do not provide a visible label, you must specify an aria-label or aria-labelledby attribute for accessibility");
  let fieldProps = $313b98861ee5dd6c$export$d6875122194c7b44({
    id,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledby
  });
  return {
    labelProps,
    fieldProps
  };
}
function useIsMounted(props = {}) {
  const { rerender = false, delay = 0 } = props;
  const isMountedRef = reactExports.useRef(false);
  const [isMounted, setIsMounted] = reactExports.useState(false);
  reactExports.useEffect(() => {
    isMountedRef.current = true;
    let timer = null;
    if (rerender) {
      if (delay > 0) {
        timer = setTimeout(() => {
          setIsMounted(true);
        }, delay);
      } else {
        setIsMounted(true);
      }
    }
    return () => {
      isMountedRef.current = false;
      if (rerender) {
        setIsMounted(false);
      }
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [rerender]);
  return [reactExports.useCallback(() => isMountedRef.current, []), isMounted];
}
function $204d9ebcedfb8806$export$ed5abd763a836edc(props) {
  let { value = 0, minValue = 0, maxValue = 100, valueLabel, isIndeterminate, formatOptions = {
    style: "percent"
  } } = props;
  let domProps = $65484d02dcb7eb3e$export$457c3d6518dd4c6f(props, {
    labelable: true
  });
  let { labelProps, fieldProps } = $d191a55c9702f145$export$8467354a121f1b9f({
    ...props,
    // Progress bar is not an HTML input element so it
    // shouldn't be labeled by a <label> element.
    labelElementType: "span"
  });
  value = $9446cca9a3875146$export$7d15b64cf5a3a4c4(value, minValue, maxValue);
  let percentage = (value - minValue) / (maxValue - minValue);
  let formatter = $a916eb452884faea$export$b7a616150fdb9f44(formatOptions);
  if (!isIndeterminate && !valueLabel) {
    let valueToFormat = formatOptions.style === "percent" ? percentage : value;
    valueLabel = formatter.format(valueToFormat);
  }
  return {
    progressBarProps: $3ef42575df84b30b$export$9d1611c77c2fe928(domProps, {
      ...fieldProps,
      "aria-valuenow": isIndeterminate ? void 0 : value,
      "aria-valuemin": minValue,
      "aria-valuemax": maxValue,
      "aria-valuetext": isIndeterminate ? void 0 : valueLabel,
      role: "progressbar"
    }),
    labelProps
  };
}
function useProgress(originalProps) {
  var _a, _b;
  const globalContext = useProviderContext();
  const [props, variantProps] = mapPropsVariants(originalProps, progress.variantKeys);
  const {
    ref,
    as,
    id,
    className,
    classNames,
    label,
    valueLabel,
    value = 0,
    minValue = 0,
    maxValue = 100,
    showValueLabel = false,
    formatOptions = {
      style: "percent"
    },
    ...otherProps
  } = props;
  const Component = as || "div";
  const domRef = useDOMRef(ref);
  const baseStyles = clsx(classNames == null ? void 0 : classNames.base, className);
  const [, isMounted] = useIsMounted({
    rerender: true,
    delay: 100
  });
  const isIndeterminate = originalProps.isIndeterminate;
  const disableAnimation = (_b = (_a = originalProps.disableAnimation) != null ? _a : globalContext == null ? void 0 : globalContext.disableAnimation) != null ? _b : false;
  const { progressBarProps, labelProps } = $204d9ebcedfb8806$export$ed5abd763a836edc({
    id,
    label,
    value,
    minValue,
    maxValue,
    valueLabel,
    formatOptions,
    isIndeterminate,
    "aria-labelledby": originalProps["aria-labelledby"],
    "aria-label": originalProps["aria-label"]
  });
  const slots = reactExports.useMemo(
    () => progress({
      ...variantProps,
      disableAnimation
    }),
    [objectToDeps(variantProps), disableAnimation]
  );
  const selfMounted = disableAnimation ? true : isMounted;
  const percentage = reactExports.useMemo(
    () => isIndeterminate || !selfMounted ? void 0 : clampPercentage((value - minValue) / (maxValue - minValue) * 100),
    [selfMounted, isIndeterminate, value, minValue, maxValue]
  );
  const getProgressBarProps = reactExports.useCallback(
    (props2 = {}) => ({
      ref: domRef,
      "data-indeterminate": dataAttr(isIndeterminate),
      "data-disabled": dataAttr(originalProps.isDisabled),
      className: slots.base({ class: baseStyles }),
      ...$3ef42575df84b30b$export$9d1611c77c2fe928(progressBarProps, otherProps, props2)
    }),
    [
      domRef,
      slots,
      isIndeterminate,
      originalProps.isDisabled,
      baseStyles,
      progressBarProps,
      otherProps
    ]
  );
  const getLabelProps = reactExports.useCallback(
    (props2 = {}) => ({
      className: slots.label({ class: classNames == null ? void 0 : classNames.label }),
      ...$3ef42575df84b30b$export$9d1611c77c2fe928(labelProps, props2)
    }),
    [slots, classNames, labelProps]
  );
  return {
    Component,
    domRef,
    slots,
    classNames,
    label,
    percentage,
    showValueLabel,
    getProgressBarProps,
    getLabelProps
  };
}
var Progress$2 = forwardRef((props, ref) => {
  const {
    Component,
    slots,
    classNames,
    label,
    percentage,
    showValueLabel,
    getProgressBarProps,
    getLabelProps
  } = useProgress({ ...props, ref });
  const progressBarProps = getProgressBarProps();
  const shouldShowLabelWrapper = label || showValueLabel;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Component, { ...progressBarProps, children: [
    shouldShowLabelWrapper ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: slots.labelWrapper({ class: classNames == null ? void 0 : classNames.labelWrapper }), children: [
      label && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { ...getLabelProps(), children: label }),
      showValueLabel && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: slots.value({ class: classNames == null ? void 0 : classNames.value }), children: progressBarProps["aria-valuetext"] })
    ] }) : null,
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: slots.track({ class: classNames == null ? void 0 : classNames.track }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: slots.indicator({ class: classNames == null ? void 0 : classNames.indicator }),
        style: {
          transform: `translateX(-${100 - (percentage || 0)}%)`
        }
      }
    ) })
  ] });
});
Progress$2.displayName = "HeroUI.Progress";
var progress_default = Progress$2;
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Activity = createLucideIcon("Activity", [
  [
    "path",
    {
      d: "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",
      key: "169zse"
    }
  ]
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const BookOpen = createLucideIcon("BookOpen", [
  ["path", { d: "M12 7v14", key: "1akyts" }],
  [
    "path",
    {
      d: "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",
      key: "ruj8y"
    }
  ]
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Brain = createLucideIcon("Brain", [
  [
    "path",
    {
      d: "M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z",
      key: "l5xja"
    }
  ],
  [
    "path",
    {
      d: "M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z",
      key: "ep3f8r"
    }
  ],
  ["path", { d: "M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4", key: "1p4c4q" }],
  ["path", { d: "M17.599 6.5a3 3 0 0 0 .399-1.375", key: "tmeiqw" }],
  ["path", { d: "M6.003 5.125A3 3 0 0 0 6.401 6.5", key: "105sqy" }],
  ["path", { d: "M3.477 10.896a4 4 0 0 1 .585-.396", key: "ql3yin" }],
  ["path", { d: "M19.938 10.5a4 4 0 0 1 .585.396", key: "1qfode" }],
  ["path", { d: "M6 18a4 4 0 0 1-1.967-.516", key: "2e4loj" }],
  ["path", { d: "M19.967 17.484A4 4 0 0 1 18 18", key: "159ez6" }]
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Bug = createLucideIcon("Bug", [
  ["path", { d: "m8 2 1.88 1.88", key: "fmnt4t" }],
  ["path", { d: "M14.12 3.88 16 2", key: "qol33r" }],
  ["path", { d: "M9 7.13v-1a3.003 3.003 0 1 1 6 0v1", key: "d7y7pr" }],
  [
    "path",
    {
      d: "M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6",
      key: "xs1cw7"
    }
  ],
  ["path", { d: "M12 20v-9", key: "1qisl0" }],
  ["path", { d: "M6.53 9C4.6 8.8 3 7.1 3 5", key: "32zzws" }],
  ["path", { d: "M6 13H2", key: "82j7cp" }],
  ["path", { d: "M3 21c0-2.1 1.7-3.9 3.8-4", key: "4p0ekp" }],
  ["path", { d: "M20.97 5c0 2.1-1.6 3.8-3.5 4", key: "18gb23" }],
  ["path", { d: "M22 13h-4", key: "1jl80f" }],
  ["path", { d: "M17.2 17c2.1.1 3.8 1.9 3.8 4", key: "k3fwyw" }]
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ChartColumn = createLucideIcon("ChartColumn", [
  ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16", key: "c24i48" }],
  ["path", { d: "M18 17V9", key: "2bz60n" }],
  ["path", { d: "M13 17V5", key: "1frdt8" }],
  ["path", { d: "M8 17v-3", key: "17ska0" }]
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const CircleHelp = createLucideIcon("CircleHelp", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3", key: "1u773s" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Code = createLucideIcon("Code", [
  ["polyline", { points: "16 18 22 12 16 6", key: "z7tu5w" }],
  ["polyline", { points: "8 6 2 12 8 18", key: "1eg1df" }]
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Cpu = createLucideIcon("Cpu", [
  ["rect", { width: "16", height: "16", x: "4", y: "4", rx: "2", key: "14l7u7" }],
  ["rect", { width: "6", height: "6", x: "9", y: "9", rx: "1", key: "5aljv4" }],
  ["path", { d: "M15 2v2", key: "13l42r" }],
  ["path", { d: "M15 20v2", key: "15mkzm" }],
  ["path", { d: "M2 15h2", key: "1gxd5l" }],
  ["path", { d: "M2 9h2", key: "1bbxkp" }],
  ["path", { d: "M20 15h2", key: "19e6y8" }],
  ["path", { d: "M20 9h2", key: "19tzq7" }],
  ["path", { d: "M9 2v2", key: "165o2o" }],
  ["path", { d: "M9 20v2", key: "i2bqo8" }]
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Globe = createLucideIcon("Globe", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20", key: "13o1zl" }],
  ["path", { d: "M2 12h20", key: "9i4pu4" }]
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const HardDrive = createLucideIcon("HardDrive", [
  ["line", { x1: "22", x2: "2", y1: "12", y2: "12", key: "1y58io" }],
  [
    "path",
    {
      d: "M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z",
      key: "oot6mr"
    }
  ],
  ["line", { x1: "6", x2: "6.01", y1: "16", y2: "16", key: "sgf278" }],
  ["line", { x1: "10", x2: "10.01", y1: "16", y2: "16", key: "1l4acy" }]
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Headphones = createLucideIcon("Headphones", [
  [
    "path",
    {
      d: "M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3",
      key: "1xhozi"
    }
  ]
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Key = createLucideIcon("Key", [
  ["path", { d: "m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4", key: "g0fldk" }],
  ["path", { d: "m21 2-9.6 9.6", key: "1j0ho8" }],
  ["circle", { cx: "7.5", cy: "15.5", r: "5.5", key: "yqb3hr" }]
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Mail = createLucideIcon("Mail", [
  ["rect", { width: "20", height: "16", x: "2", y: "4", rx: "2", key: "18n3k1" }],
  ["path", { d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7", key: "1ocrg3" }]
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Map$1 = createLucideIcon("Map", [
  [
    "path",
    {
      d: "M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z",
      key: "169xi5"
    }
  ],
  ["path", { d: "M15 5.764v15", key: "1pn4in" }],
  ["path", { d: "M9 3.236v15", key: "1uimfh" }]
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Scale = createLucideIcon("Scale", [
  ["path", { d: "m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z", key: "7g6ntu" }],
  ["path", { d: "m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z", key: "ijws7r" }],
  ["path", { d: "M7 21h10", key: "1b0cd5" }],
  ["path", { d: "M12 3v18", key: "108xh3" }],
  ["path", { d: "M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2", key: "3gwbw2" }]
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const TrendingUp = createLucideIcon("TrendingUp", [
  ["polyline", { points: "22 7 13.5 15.5 8.5 10.5 2 17", key: "126l90" }],
  ["polyline", { points: "16 7 22 7 22 13", key: "kwv8wd" }]
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Upload = createLucideIcon("Upload", [
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
  ["polyline", { points: "17 8 12 3 7 8", key: "t8dd8p" }],
  ["line", { x1: "12", x2: "12", y1: "3", y2: "15", key: "widbto" }]
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Zap = createLucideIcon("Zap", [
  [
    "path",
    {
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
]);
const ChangePasswordDialog = ({
  isOpen,
  onClose
}) => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [newPassword, setNewPassword] = reactExports.useState("");
  const [confirmPassword, setConfirmPassword] = reactExports.useState("");
  const [showNewPassword, setShowNewPassword] = reactExports.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = reactExports.useState(false);
  const [loading, setLoading] = reactExports.useState(false);
  const [passwordErrors, setPasswordErrors] = reactExports.useState([]);
  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 8) {
      errors.push(t("passwordMinLength"));
    }
    if (!/[A-Z]/.test(password)) {
      errors.push(t("passwordUppercase"));
    }
    if (!/[a-z]/.test(password)) {
      errors.push(t("passwordLowercase"));
    }
    if (!/[0-9]/.test(password)) {
      errors.push(t("passwordNumber"));
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push(t("passwordSpecial"));
    }
    return errors;
  };
  const handlePasswordChange = (value) => {
    setNewPassword(value);
    setPasswordErrors(validatePassword(value));
  };
  const handleSave = async () => {
    if (!user) {
      toast({
        title: t("errorTitle"),
        description: "User not authenticated",
        variant: "destructive"
      });
      return;
    }
    if (!newPassword.trim()) {
      toast({
        title: t("errorTitle"),
        description: t("fillAllFields"),
        variant: "destructive"
      });
      return;
    }
    const errors = validatePassword(newPassword);
    if (errors.length > 0) {
      toast({
        title: t("validationError"),
        description: errors.join(". "),
        variant: "destructive"
      });
      return;
    }
    if (newPassword !== confirmPassword) {
      toast({
        title: t("validationError"),
        description: t("passwordsNotMatch"),
        variant: "destructive"
      });
      return;
    }
    try {
      setLoading(true);
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });
      if (error) {
        console.error("Password update error:", error);
        toast({
          title: t("errorTitle"),
          description: error.message,
          variant: "destructive"
        });
        return;
      }
      toast({
        title: t("passwordChanged"),
        description: t("passwordChangedMessage")
      });
      handleClose();
    } catch (error) {
      console.error("Password change error:", error);
      toast({
        title: t("errorTitle"),
        description: t("connectionError"),
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  const handleClose = () => {
    setNewPassword("");
    setConfirmPassword("");
    setPasswordErrors([]);
    setShowNewPassword(false);
    setShowConfirmPassword(false);
    onClose();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: isOpen, onOpenChange: handleClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "bg-card border-border", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "text-white", children: t("changePassword") }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "newPassword", className: "text-white", children: t("newPassword") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            OptimizedInput,
            {
              id: "newPassword",
              type: showNewPassword ? "text" : "password",
              value: newPassword,
              onChange: (e) => handlePasswordChange(e.target.value),
              placeholder: t("passwordPlaceholder"),
              className: "bg-dark border-border text-white pr-10",
              disabled: loading
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setShowNewPassword(!showNewPassword),
              className: "absolute inset-y-0 right-0 flex items-center justify-center w-10 text-gray-400 hover:text-gray-600",
              disabled: loading,
              children: showNewPassword ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" })
            }
          )
        ] }),
        passwordErrors.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-red-400 mt-1", children: passwordErrors.map((error, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          "• ",
          error
        ] }, index)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "confirmPassword", className: "text-white", children: t("confirmNewPassword") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            OptimizedInput,
            {
              id: "confirmPassword",
              type: showConfirmPassword ? "text" : "password",
              value: confirmPassword,
              onChange: (e) => setConfirmPassword(e.target.value),
              placeholder: t("confirmPasswordPlaceholder"),
              className: "bg-dark border-border text-white pr-10",
              disabled: loading
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setShowConfirmPassword(!showConfirmPassword),
              className: "absolute inset-y-0 right-0 flex items-center justify-center w-10 text-gray-400 hover:text-gray-600",
              disabled: loading,
              children: showConfirmPassword ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" })
            }
          )
        ] }),
        confirmPassword && newPassword !== confirmPassword && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-red-400 mt-1", children: t("passwordsNotMatch") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex space-x-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: handleSave,
            className: "flex-1 bg-green-600 hover:bg-green-700 text-white",
            disabled: loading || passwordErrors.length > 0,
            children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 mr-2 animate-spin" }),
              t("saving")
            ] }) : t("saveChanges")
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: handleClose,
            variant: "outline",
            className: "flex-1 border-border text-white",
            disabled: loading,
            children: t("cancel")
          }
        )
      ] })
    ] })
  ] }) });
};
const EditProfileDialog = ({
  isOpen,
  onClose,
  userEmail,
  userName,
  userAvatar,
  userBio,
  onProfileUpdate
}) => {
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const [name, setName] = reactExports.useState(userName);
  const [email, setEmail] = reactExports.useState(userEmail);
  const [avatar, setAvatar] = reactExports.useState(userAvatar || "");
  const [bio, setBio] = reactExports.useState(userBio || "");
  const [isChangePasswordOpen, setIsChangePasswordOpen] = reactExports.useState(false);
  const [uploading, setUploading] = reactExports.useState(false);
  const [saving, setSaving] = reactExports.useState(false);
  React.useEffect(() => {
    setName(userName);
    setEmail(userEmail);
    setAvatar(userAvatar || "");
    setBio(userBio || "");
  }, [userName, userEmail, userAvatar, userBio]);
  const deleteOldAvatars = async () => {
    if (!user) return;
    try {
      const { data: files } = await supabase.storage.from("avatars").list("", {
        search: user.id
      });
      if (files && files.length > 0) {
        const filePaths = files.map((file) => file.name);
        await supabase.storage.from("avatars").remove(filePaths);
      }
    } catch (error) {
      console.error("Error deleting old avatars:", error);
    }
  };
  const uploadAvatarToSupabase = async (file) => {
    if (!user) return null;
    try {
      setUploading(true);
      const fileExt = file.name.split(".").pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;
      const { data: buckets } = await supabase.storage.listBuckets();
      const avatarBucket = buckets?.find((bucket) => bucket.name === "avatars");
      if (!avatarBucket) {
        const { error: bucketError } = await supabase.storage.createBucket("avatars", {
          public: true,
          allowedMimeTypes: ["image/*"],
          fileSizeLimit: 5242880
          // 5MB
        });
        if (bucketError) {
          console.error("Bucket creation error:", bucketError);
        }
      }
      await deleteOldAvatars();
      const { error: uploadError } = await supabase.storage.from("avatars").upload(filePath, file, {
        cacheControl: "3600",
        upsert: false
      });
      if (uploadError) {
        console.error("Upload error:", uploadError);
        toast({
          title: t("errorTitle"),
          description: "Error uploading avatar: " + uploadError.message,
          variant: "destructive"
        });
        return null;
      }
      const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);
      return data.publicUrl;
    } catch (error) {
      console.error("Avatar upload error:", error);
      toast({
        title: t("errorTitle"),
        description: "Error uploading avatar",
        variant: "destructive"
      });
      return null;
    } finally {
      setUploading(false);
    }
  };
  const handleAvatarChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: t("avatarError"),
        description: t("avatarSizeError"),
        variant: "destructive"
      });
      return;
    }
    if (!file.type.startsWith("image/")) {
      toast({
        title: t("avatarError"),
        description: t("avatarTypeError"),
        variant: "destructive"
      });
      return;
    }
    const avatarUrl = await uploadAvatarToSupabase(file);
    if (avatarUrl) {
      setAvatar(avatarUrl);
      toast({
        title: t("avatarUploaded"),
        description: t("avatarUploadedDesc")
      });
    }
  };
  const handleSave = async () => {
    if (!user) return;
    if (!name.trim()) {
      toast({
        title: t("errorTitle"),
        description: t("namePlaceholder")
      });
      return;
    }
    if (!email.trim()) {
      toast({
        title: t("errorTitle"),
        description: "Email is required"
      });
      return;
    }
    try {
      setSaving(true);
      const { error } = await supabase.from("profiles").update({
        full_name: name,
        email,
        avatar_url: avatar || null,
        bio: bio || null,
        updated_at: (/* @__PURE__ */ new Date()).toISOString()
      }).eq("id", user.id);
      if (error) {
        console.error("Profile update error:", error);
        toast({
          title: t("errorTitle"),
          description: "Error updating profile",
          variant: "destructive"
        });
        return;
      }
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userName", name);
      if (avatar) {
        localStorage.setItem("userAvatar", avatar);
      }
      onProfileUpdate(name, email, avatar, bio);
      toast({
        title: t("profileUpdated"),
        description: t("profileUpdateMessage")
      });
      onClose();
    } catch (error) {
      console.error("Save error:", error);
      toast({
        title: t("errorTitle"),
        description: t("connectionError"),
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };
  const getUserInitials = (name2, email2) => {
    if (name2) {
      return name2.slice(0, 2).toUpperCase();
    }
    return email2.slice(0, 2).toUpperCase();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: isOpen, onOpenChange: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-h-[90vh] overflow-y-auto max-w-md w-full bg-background/80 backdrop-blur-xl border-0 rounded-3xl shadow-2xl p-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative bg-gradient-to-br from-blue-600/20 to-purple-600/20 p-6 pb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { className: "relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "text-xl font-bold text-white text-center", children: t("editProfile") }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative group", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-70 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { className: "relative w-28 h-28 bg-background/80 ring-4 ring-white/10 hover:ring-white/20 transition-all duration-300 transform hover:scale-105", children: avatar ? /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarImage, { src: avatar, alt: "Avatar", className: "rounded-full" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "text-white text-2xl font-bold bg-background/80", children: getUserInitials(name, email) }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              className: "bg-white/5 backdrop-blur-sm border-white/10 text-white hover:bg-white/10 hover:border-white/20 rounded-2xl px-6 py-2 transition-all duration-300 transform hover:scale-105",
              onClick: () => document.getElementById("avatar-upload")?.click(),
              disabled: uploading,
              children: [
                uploading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 mr-2 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-4 h-4 mr-2" }),
                uploading ? t("uploading") : t("selectFromGallery")
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: "avatar-upload",
              type: "file",
              accept: "image/*",
              onChange: handleAvatarChange,
              className: "hidden",
              disabled: uploading
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "name", className: "text-white/80 text-sm font-medium", children: t("name") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              OptimizedInput,
              {
                id: "name",
                textType: "name",
                value: name,
                onChange: (e) => setName(e.target.value),
                placeholder: t("namePlaceholder"),
                className: "bg-white/5 backdrop-blur-sm border-white/10 text-white placeholder-white/50 rounded-2xl h-12 px-4 transition-all duration-300 focus:bg-white/10 focus:border-white/30"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "email", className: "text-white/80 text-sm font-medium", children: t("email") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              OptimizedInput,
              {
                id: "email",
                type: "email",
                value: email,
                onChange: (e) => setEmail(e.target.value),
                placeholder: t("emailPlaceholder"),
                className: "bg-white/5 backdrop-blur-sm border-white/10 text-white placeholder-white/50 rounded-2xl h-12 px-4 transition-all duration-300 focus:bg-white/10 focus:border-white/30"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "bio", className: "text-white/80 text-sm font-medium", children: t("Bio") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "textarea",
              {
                id: "bio",
                value: bio,
                onChange: (e) => setBio(e.target.value),
                placeholder: language === "es" ? "Escribe algo sobre ti... 😊" : "Write something about yourself... 😊",
                className: "bg-white/5 backdrop-blur-sm border-white/10 text-white placeholder-white/50 rounded-2xl px-4 py-3 min-h-[100px] transition-all duration-300 focus:bg-white/10 focus:border-white/30 resize-none w-full border flex",
                autoCorrect: "on",
                autoCapitalize: "sentences",
                spellCheck: true,
                maxLength: 500,
                style: {
                  fontFamily: 'system-ui, -apple-system, "Segoe UI Emoji", "Apple Color Emoji", "Noto Color Emoji", sans-serif'
                }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-white/50 text-right", children: [
              bio.length,
              "/500 символов"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-white/80 text-sm font-medium", children: t("password") }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                onClick: () => setIsChangePasswordOpen(true),
                variant: "outline",
                className: "w-full bg-white/5 backdrop-blur-sm border-white/10 text-white hover:bg-white/10 hover:border-white/20 rounded-2xl h-12 transition-all duration-300 transform hover:scale-[1.02]",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Key, { className: "w-4 h-4 mr-2" }),
                  t("changePassword")
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex space-x-3 pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: handleSave,
              className: "flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-2xl h-12 font-medium transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl",
              disabled: saving || uploading,
              children: saving ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 mr-2 animate-spin" }),
                t("saving")
              ] }) : t("saveChanges")
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: onClose,
              variant: "outline",
              className: "flex-1 bg-white/5 backdrop-blur-sm border-white/10 text-white hover:bg-white/10 hover:border-white/20 rounded-2xl h-12 font-medium transition-all duration-300 transform hover:scale-[1.02]",
              disabled: saving || uploading,
              children: t("cancel")
            }
          )
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ChangePasswordDialog,
      {
        isOpen: isChangePasswordOpen,
        onClose: () => setIsChangePasswordOpen(false)
      }
    )
  ] });
};
const _BadgeService = class _BadgeService {
  static getInstance() {
    if (!_BadgeService.instance) {
      _BadgeService.instance = new _BadgeService();
    }
    return _BadgeService.instance;
  }
  // Получить все доступные бейджи
  async getAllBadges() {
    try {
      const { data, error } = await supabase.from("badges").select("*").order("created_at", { ascending: true });
      if (error) {
        console.error("Error fetching badges:", error);
        return [];
      }
      return data || [];
    } catch (error) {
      console.error("Error in getAllBadges:", error);
      return [];
    }
  }
  // Получить бейджи пользователя
  async getUserBadges(userId) {
    try {
      const { data, error } = await supabase.from("user_badges").select(`
          *,
          badge:badge_id (*)
        `).eq("user_id", userId).order("awarded_at", { ascending: false });
      if (error) {
        console.error("Error fetching user badges:", error);
        return [];
      }
      return data || [];
    } catch (error) {
      console.error("Error in getUserBadges:", error);
      return [];
    }
  }
  // Проверить, есть ли у пользователя определенный бейдж
  async userHasBadge(userId, badgeCode) {
    try {
      const { data, error } = await supabase.from("user_badges").select("id").eq("user_id", userId).eq("badge_id", (await supabase.from("badges").select("id").eq("code", badgeCode).single()).data?.id).single();
      return !error && !!data;
    } catch (error) {
      return false;
    }
  }
  // Присвоить бейдж пользователю
  async awardBadge(userId, badgeCode, awardedBy, reason) {
    try {
      const { data: badge, error: badgeError } = await supabase.from("badges").select("id").eq("code", badgeCode).single();
      if (badgeError || !badge) {
        console.error("Badge not found:", badgeCode);
        return false;
      }
      const hasBadge = await this.userHasBadge(userId, badgeCode);
      if (hasBadge) {
        console.log("User already has this badge:", badgeCode);
        return true;
      }
      const { error } = await supabase.from("user_badges").insert({
        user_id: userId,
        badge_id: badge.id,
        awarded_by: awardedBy,
        reason
      });
      if (error) {
        console.error("Error awarding badge:", error);
        return false;
      }
      console.log(`Awarded badge ${badgeCode} to user ${userId}`);
      return true;
    } catch (error) {
      console.error("Error in awardBadge:", error);
      return false;
    }
  }
  // Отозвать бейдж у пользователя (только для админов)
  async revokeBadge(userId, badgeCode) {
    try {
      const { data: badge, error: badgeError } = await supabase.from("badges").select("id").eq("code", badgeCode).single();
      if (badgeError || !badge) {
        console.error("Badge not found:", badgeCode);
        return false;
      }
      const { error } = await supabase.from("user_badges").delete().eq("user_id", userId).eq("badge_id", badge.id);
      if (error) {
        console.error("Error revoking badge:", error);
        return false;
      }
      console.log(`Revoked badge ${badgeCode} from user ${userId}`);
      return true;
    } catch (error) {
      console.error("Error in revokeBadge:", error);
      return false;
    }
  }
  // Проверить и присвоить автоматические бейджи
  async checkAndAwardAutoBadges(userId) {
    try {
      const stats = await this.getUserStats(userId);
      const { data: autoBadges, error } = await supabase.from("badges").select("*").eq("auto_award", true);
      if (error || !autoBadges) {
        console.error("Error fetching auto badges:", error);
        return;
      }
      for (const badge of autoBadges) {
        const shouldAward = await this.checkBadgeCondition(badge, stats);
        if (shouldAward) {
          await this.awardBadge(userId, badge.code, null, "Automatically awarded");
        }
      }
    } catch (error) {
      console.error("Error in checkAndAwardAutoBadges:", error);
    }
  }
  // Проверить условие для получения бейджа
  async checkBadgeCondition(badge, stats) {
    if (!badge.condition_type || badge.condition_value === null) {
      return false;
    }
    switch (badge.condition_type) {
      case "reports_count":
        return stats.reportsCount >= badge.condition_value;
      case "confirmations_count":
        return stats.confirmationsReceived >= badge.condition_value;
      case "photos_count":
        return stats.photosUploaded >= badge.condition_value;
      case "areas_count":
        return stats.uniqueAreas >= badge.condition_value;
      case "consecutive_days":
        return stats.consecutiveDays >= badge.condition_value;
      case "level_reached":
        return stats.currentLevel >= badge.condition_value;
      case "first_responder":
        return stats.firstResponderCount >= badge.condition_value;
      case "approved_suggestions":
        return stats.approvedSuggestions >= badge.condition_value;
      default:
        return false;
    }
  }
  // Получить статистику пользователя для проверки бейджей
  async getUserStats(userId) {
    try {
      const { count: reportsCount } = await supabase.from("incidents").select("*", { count: "exact", head: true }).eq("user_id", userId);
      const { count: confirmationsCount } = await supabase.from("incident_confirmations").select("*", { count: "exact", head: true }).eq("user_id", userId);
      const { data: incidentsWithPhotos } = await supabase.from("incidents").select("photos").eq("user_id", userId);
      let photosCount = 0;
      incidentsWithPhotos?.forEach((incident) => {
        if (incident.photos && Array.isArray(incident.photos)) {
          photosCount += incident.photos.length;
        }
      });
      const { data: userXP } = await supabase.from("user_xp").select("current_level").eq("user_id", userId).single();
      return {
        reportsCount: reportsCount || 0,
        confirmationsReceived: confirmationsCount || 0,
        photosUploaded: photosCount,
        uniqueAreas: 1,
        // TODO: Реализовать подсчет уникальных районов
        consecutiveDays: 1,
        // TODO: Реализовать подсчет последовательных дней
        currentLevel: userXP?.current_level || 1,
        firstResponderCount: 0,
        // TODO: Реализовать логику первого ответчика
        approvedSuggestions: 0
        // TODO: Реализовать систему предложений
      };
    } catch (error) {
      console.error("Error getting user stats:", error);
      return {
        reportsCount: 0,
        confirmationsReceived: 0,
        photosUploaded: 0,
        uniqueAreas: 0,
        consecutiveDays: 0,
        currentLevel: 1,
        firstResponderCount: 0,
        approvedSuggestions: 0
      };
    }
  }
  // Получить локализованное название бейджа
  getBadgeName(badge, language = "es") {
    switch (language) {
      case "en":
        return badge.name_en;
      case "ru":
        return badge.name_ru;
      case "es":
      default:
        return badge.name_es;
    }
  }
  // Получить локализованное описание бейджа
  getBadgeDescription(badge, language = "es") {
    switch (language) {
      case "en":
        return badge.description_en || "";
      case "ru":
        return badge.description_ru || "";
      case "es":
      default:
        return badge.description_es || "";
    }
  }
  // Получить количество бейджей у пользователя
  async getUserBadgeCount(userId) {
    try {
      const { count, error } = await supabase.from("user_badges").select("*", { count: "exact", head: true }).eq("user_id", userId);
      if (error) {
        console.error("Error counting user badges:", error);
        return 0;
      }
      return count || 0;
    } catch (error) {
      console.error("Error in getUserBadgeCount:", error);
      return 0;
    }
  }
  // Получить последние полученные бейджи пользователя
  async getRecentBadges(userId, limit = 3) {
    try {
      const { data, error } = await supabase.from("user_badges").select(`
          *,
          badge:badge_id (*)
        `).eq("user_id", userId).order("awarded_at", { ascending: false }).limit(limit);
      if (error) {
        console.error("Error fetching recent badges:", error);
        return [];
      }
      return data || [];
    } catch (error) {
      console.error("Error in getRecentBadges:", error);
      return [];
    }
  }
  // Получить информацию о бейдже по ID (для AdminPanel)
  async getBadgeInfo(badgeId) {
    try {
      const { data: badge, error } = await supabase.from("badges").select("*").eq("id", badgeId).single();
      if (error || !badge) {
        console.error("Badge not found:", badgeId, error);
        return null;
      }
      let rarity = "common";
      if (badge.code === "radar_elite") {
        rarity = "legendary";
      } else if (badge.condition_value && badge.condition_value >= 10) {
        rarity = "epic";
      } else if (badge.condition_value && badge.condition_value >= 5) {
        rarity = "rare";
      } else if (badge.condition_value && badge.condition_value >= 3) {
        rarity = "uncommon";
      }
      return {
        name: badge.name_ru,
        // Используем русское название
        emoji: badge.emoji,
        description: badge.description_ru || badge.description_en || "",
        rarity
      };
    } catch (error) {
      console.error("Error fetching badge info:", error);
      return null;
    }
  }
  // Синхронная версия для обратной совместимости
  getBadgeInfoSync(badgeId) {
    const knownBadges = {
      "first_report": {
        name: "Первый репорт",
        emoji: "📍",
        description: "Создал первый отчет об инциденте",
        rarity: "common"
      },
      "danger_hunter": {
        name: "Охотник за опасностями",
        emoji: "🧨",
        description: "Сообщил о 3 инцидентах",
        rarity: "uncommon"
      },
      "urban_explorer": {
        name: "Городской исследователь",
        emoji: "🗺️",
        description: "Отчеты из 3+ разных районов",
        rarity: "uncommon"
      },
      "community_voice": {
        name: "Голос сообщества",
        emoji: "📢",
        description: "Получил 10+ подтверждений",
        rarity: "rare"
      },
      "visual_eye": {
        name: "Зоркий глаз",
        emoji: "📷",
        description: "Добавил 5+ фото/видео",
        rarity: "uncommon"
      },
      "local_protector": {
        name: "Местный защитник",
        emoji: "🛡️",
        description: "Первый на месте происшествия",
        rarity: "rare"
      },
      "consistent": {
        name: "Постоянный",
        emoji: "🔄",
        description: "Активен 7 дней подряд",
        rarity: "uncommon"
      },
      "advisor": {
        name: "Советник",
        emoji: "🧠",
        description: "Предложение одобрено модератором",
        rarity: "rare"
      },
      "radar_elite": {
        name: "Радар Элита",
        emoji: "👑",
        description: "Достиг уровня Командир",
        rarity: "legendary"
      }
    };
    return knownBadges[badgeId] || null;
  }
};
__publicField(_BadgeService, "instance");
let BadgeService = _BadgeService;
const _AdminService = class _AdminService {
  static getInstance() {
    if (!_AdminService.instance) {
      _AdminService.instance = new _AdminService();
    }
    return _AdminService.instance;
  }
  /**
   * Получить статистику для админ-панели
   */
  async getStatistics() {
    try {
      console.log("🔍 Loading admin statistics from Supabase...");
      const { data, error } = await supabase.rpc("get_admin_statistics");
      if (error) {
        console.error("❌ Error loading statistics:", error);
        throw error;
      }
      console.log("✅ Statistics loaded:", data);
      return data;
    } catch (error) {
      console.error("💥 Critical error loading statistics:", error);
      return await this.getStatisticsFallback();
    }
  }
  /**
   * Fallback метод для получения статистики
   */
  async getStatisticsFallback() {
    console.log("🔄 Using fallback method for statistics...");
    try {
      const [
        { count: totalUsers },
        { count: admins },
        { count: masterAdmins },
        { count: activeToday },
        { count: totalIncidents },
        { count: incidentsToday },
        { count: communityMessages }
      ] = await Promise.all([
        // Общие пользователи
        supabase.from("profiles").select("*", { count: "exact", head: true }),
        // Администраторы
        supabase.from("user_roles").select("*", { count: "exact", head: true }).eq("role", "admin"),
        // Мастер-администраторы
        supabase.from("user_roles").select("*", { count: "exact", head: true }).eq("role", "master_admin"),
        // Активные за 24 часа
        supabase.from("profiles").select("*", { count: "exact", head: true }).gte("last_sign_in_at", new Date(Date.now() - 24 * 60 * 60 * 1e3).toISOString()),
        // Общие инциденты
        supabase.from("incidents").select("*", { count: "exact", head: true }),
        // Инциденты за сегодня
        supabase.from("incidents").select("*", { count: "exact", head: true }).gte("created_at", (/* @__PURE__ */ new Date()).toISOString().split("T")[0]),
        // Сообщения сообщества
        supabase.from("community_messages").select("*", { count: "exact", head: true })
      ]);
      const premiumUsers = Math.floor((totalUsers || 0) * 0.3);
      return {
        totalUsers: totalUsers || 0,
        admins: admins || 0,
        masterAdmins: masterAdmins || 0,
        premiumUsers,
        activeToday: activeToday || 0,
        totalIncidents: totalIncidents || 0,
        incidentsToday: incidentsToday || 0,
        communityMessages: communityMessages || 0,
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      };
    } catch (error) {
      console.error("💥 Fallback statistics failed:", error);
      return {
        totalUsers: 0,
        admins: 0,
        masterAdmins: 0,
        premiumUsers: 0,
        activeToday: 0,
        totalIncidents: 0,
        incidentsToday: 0,
        communityMessages: 0,
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      };
    }
  }
  /**
   * Получить список всех пользователей с ролями и XP данными
   */
  async getUsers() {
    try {
      console.log("🔍 Loading users with XP data from Supabase...");
      const { data: usersWithXP, error: usersError } = await supabase.rpc("get_users_with_xp");
      if (usersError) {
        console.error("❌ Error loading users with XP:", usersError);
        return await this.getUsersFallback();
      }
      const { data: subscriptions, error: subscriptionsError } = await supabase.from("user_subscriptions").select("user_id, status, expires_at");
      if (subscriptionsError) {
        console.error("⚠️ Error loading subscriptions (non-critical):", subscriptionsError);
      }
      console.log("✅ Users with XP loaded:", usersWithXP?.length, "users");
      const usersWithAllData = usersWithXP?.map((user) => {
        const subscription = subscriptions?.find((s) => s.user_id === user.id);
        const isPremium = subscription?.status === "active" && subscription?.expires_at && new Date(subscription.expires_at) > /* @__PURE__ */ new Date();
        return {
          ...user,
          is_premium: isPremium || false,
          premium_until: subscription?.expires_at || null,
          last_sign_in: user.last_sign_in_at
        };
      }) || [];
      return usersWithAllData;
    } catch (error) {
      console.error("💥 Critical error loading users:", error);
      throw error;
    }
  }
  /**
   * Fallback метод для получения пользователей без XP данных
   */
  async getUsersFallback() {
    console.log("🔄 Using fallback method for users...");
    try {
      const { data: profiles, error: profilesError } = await supabase.from("profiles").select("*").order("created_at", { ascending: false });
      if (profilesError) {
        console.error("❌ Error loading profiles:", profilesError);
        throw profilesError;
      }
      const { data: roles, error: rolesError } = await supabase.from("user_roles").select("user_id, role");
      if (rolesError) {
        console.error("❌ Error loading roles:", rolesError);
        throw rolesError;
      }
      const { data: subscriptions, error: subscriptionsError } = await supabase.from("user_subscriptions").select("user_id, status, expires_at");
      if (subscriptionsError) {
        console.error("⚠️ Error loading subscriptions (non-critical):", subscriptionsError);
      }
      const usersWithRoles = profiles?.map((profile) => {
        const userRole = roles?.find((r) => r.user_id === profile.id);
        const subscription = subscriptions?.find((s) => s.user_id === profile.id);
        const isPremium = subscription?.status === "active" && subscription?.expires_at && new Date(subscription.expires_at) > /* @__PURE__ */ new Date();
        return {
          ...profile,
          role: userRole?.role || "user",
          is_premium: isPremium || false,
          premium_until: subscription?.expires_at || null,
          last_sign_in: profile.last_sign_in_at
        };
      }) || [];
      return usersWithRoles;
    } catch (error) {
      console.error("💥 Fallback users loading failed:", error);
      throw error;
    }
  }
  /**
   * Получить детальную информацию о пользователе
   */
  async getUserDetails(userId) {
    try {
      console.log("🔍 Loading user details for:", userId);
      const { data, error } = await supabase.rpc("get_user_admin_details", { target_user_id: userId });
      if (error) {
        console.error("❌ Error loading user details:", error);
        throw error;
      }
      console.log("✅ User details loaded:", data);
      return data;
    } catch (error) {
      console.error("💥 Critical error loading user details:", error);
      throw error;
    }
  }
  /**
   * Заблокировать пользователя
   */
  async blockUser(userId, until) {
    try {
      console.log("🚫 Blocking user:", userId, until ? `until ${until}` : "permanently");
      const { error } = await supabase.from("profiles").update({
        is_blocked: true,
        blocked_until: until || null
      }).eq("id", userId);
      if (error) {
        console.error("❌ Error blocking user:", error);
        throw error;
      }
      console.log("✅ User blocked successfully");
    } catch (error) {
      console.error("💥 Critical error blocking user:", error);
      throw error;
    }
  }
  /**
   * Разблокировать пользователя
   */
  async unblockUser(userId) {
    try {
      console.log("✅ Unblocking user:", userId);
      const { error } = await supabase.from("profiles").update({
        is_blocked: false,
        blocked_until: null
      }).eq("id", userId);
      if (error) {
        console.error("❌ Error unblocking user:", error);
        throw error;
      }
      console.log("✅ User unblocked successfully");
    } catch (error) {
      console.error("💥 Critical error unblocking user:", error);
      throw error;
    }
  }
  /**
   * Удалить пользователя и все его данные
   */
  async deleteUser(userId) {
    try {
      console.log("🗑️ Deleting user and all data:", userId);
      await Promise.all([
        supabase.from("user_roles").delete().eq("user_id", userId),
        supabase.from("user_xp").delete().eq("user_id", userId),
        supabase.from("user_badges").delete().eq("user_id", userId),
        supabase.from("user_subscriptions").delete().eq("user_id", userId),
        supabase.from("xp_transactions").delete().eq("user_id", userId),
        supabase.from("report_confirmations").delete().eq("user_id", userId),
        supabase.from("incident_comments").delete().eq("user_id", userId),
        supabase.from("community_messages").delete().eq("user_id", userId),
        supabase.from("community_reports").delete().eq("user_id", userId),
        supabase.from("incidents").delete().eq("user_id", userId),
        supabase.from("wanted_persons").delete().eq("user_id", userId),
        supabase.from("notifications").delete().eq("user_id", userId)
      ]);
      const { error } = await supabase.from("profiles").delete().eq("id", userId);
      if (error) {
        console.error("❌ Error deleting user profile:", error);
        throw error;
      }
      console.log("✅ User deleted successfully");
    } catch (error) {
      console.error("💥 Critical error deleting user:", error);
      throw error;
    }
  }
  /**
   * Назначить пользователя администратором
   */
  async addAdmin(email) {
    try {
      console.log("👑 Adding admin role to user:", email);
      const { data: profile, error: profileError } = await supabase.from("profiles").select("id").eq("email", email.trim()).single();
      if (profileError || !profile) {
        throw new Error("Пользователь с таким email не найден");
      }
      const { error } = await supabase.from("user_roles").upsert({ user_id: profile.id, role: "admin" });
      if (error) {
        console.error("❌ Error adding admin role:", error);
        throw error;
      }
      console.log("✅ Admin role added successfully");
    } catch (error) {
      console.error("💥 Critical error adding admin:", error);
      throw error;
    }
  }
  /**
   * Проверить права доступа текущего пользователя
   */
  async checkAdminAccess() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        return { isAdmin: false, isMasterAdmin: false };
      }
      const { data: userRole } = await supabase.from("user_roles").select("role").eq("user_id", user.id).single();
      const isAdmin = userRole?.role === "admin" || userRole?.role === "master_admin";
      const isMasterAdmin = userRole?.role === "master_admin";
      return { isAdmin, isMasterAdmin };
    } catch (error) {
      console.error("Error checking admin access:", error);
      return { isAdmin: false, isMasterAdmin: false };
    }
  }
};
__publicField(_AdminService, "instance");
let AdminService = _AdminService;
const useAIAnalytics = () => {
  const [stats, setStats] = reactExports.useState(null);
  const [models, setModels] = reactExports.useState([]);
  const [weights, setWeights] = reactExports.useState([]);
  const [logs, setLogs] = reactExports.useState([]);
  const [moderationConfig, setModerationConfig] = reactExports.useState(null);
  const [isLoading, setIsLoading] = reactExports.useState(true);
  const [error, setError] = reactExports.useState(null);
  const loadStats = async () => {
    try {
      const { data, error: error2 } = await supabase.from("ai_analytics_stats").select("*").eq("date", (/* @__PURE__ */ new Date()).toISOString().split("T")[0]).single();
      if (error2 && error2.code !== "PGRST116") throw error2;
      if (data) {
        setStats({
          totalQueries: data.total_queries,
          successfulQueries: data.successful_queries,
          failedQueries: data.failed_queries,
          avgResponseTime: data.avg_response_time_ms,
          cpuUsage: data.cpu_usage_percent,
          ramUsage: data.ram_usage_gb,
          gpuUsage: data.gpu_usage_percent,
          moderationActions: data.moderation_actions,
          spamDetected: data.spam_detected,
          toxicityDetected: data.toxicity_detected
        });
      }
    } catch (err) {
      console.error("Ошибка загрузки статистики:", err);
      setError("Не удалось загрузить статистику");
    }
  };
  const loadModels = async () => {
    try {
      const { data, error: error2 } = await supabase.from("ai_models_config").select("*").order("created_at", { ascending: false });
      if (error2) throw error2;
      setModels(data || []);
    } catch (err) {
      console.error("Ошибка загрузки моделей:", err);
      setError("Не удалось загрузить модели");
    }
  };
  const loadWeights = async () => {
    try {
      const { data, error: error2 } = await supabase.from("ai_risk_weights").select("*").order("weight_name");
      if (error2) throw error2;
      setWeights(data || []);
    } catch (err) {
      console.error("Ошибка загрузки весов:", err);
      setError("Не удалось загрузить веса рисков");
    }
  };
  const loadLogs = async () => {
    try {
      const { data, error: error2 } = await supabase.from("ai_usage_logs").select("*").order("created_at", { ascending: false }).limit(50);
      if (error2) throw error2;
      setLogs(data || []);
    } catch (err) {
      console.error("Ошибка загрузки логов:", err);
      setError("Не удалось загрузить логи");
    }
  };
  const loadModerationConfig = async () => {
    try {
      const { data, error: error2 } = await supabase.from("ai_moderation_config").select("*").single();
      if (error2 && error2.code !== "PGRST116") throw error2;
      setModerationConfig(data);
    } catch (err) {
      console.error("Ошибка загрузки настроек модерации:", err);
      setError("Не удалось загрузить настройки модерации");
    }
  };
  const updateModel = async (id, updates) => {
    try {
      const { error: error2 } = await supabase.from("ai_models_config").update(updates).eq("id", id);
      if (error2) throw error2;
      await loadModels();
      await addLog("info", `Модель ${updates.model_name || "неизвестна"} обновлена`);
    } catch (err) {
      console.error("Ошибка обновления модели:", err);
      throw new Error("Не удалось обновить модель");
    }
  };
  const updateWeight = async (id, value) => {
    try {
      const { error: error2 } = await supabase.from("ai_risk_weights").update({ weight_value: value, updated_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("id", id);
      if (error2) throw error2;
      await loadWeights();
      await addLog("info", `Вес риска обновлен: ${value}`);
    } catch (err) {
      console.error("Ошибка обновления веса:", err);
      throw new Error("Не удалось обновить вес риска");
    }
  };
  const updateModerationConfig = async (updates) => {
    try {
      const { error: error2 } = await supabase.from("ai_moderation_config").update({ ...updates, updated_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("id", moderationConfig?.id);
      if (error2) throw error2;
      await loadModerationConfig();
      await addLog("info", "Настройки модерации обновлены");
    } catch (err) {
      console.error("Ошибка обновления настроек модерации:", err);
      throw new Error("Не удалось обновить настройки модерации");
    }
  };
  const addModel = async (modelData) => {
    try {
      const { error: error2 } = await supabase.from("ai_models_config").insert([modelData]);
      if (error2) throw error2;
      await loadModels();
      await addLog("success", `Новая модель добавлена: ${modelData.model_name}`);
    } catch (err) {
      console.error("Ошибка добавления модели:", err);
      throw new Error("Не удалось добавить модель");
    }
  };
  const deleteModel = async (id, modelName) => {
    try {
      const { error: error2 } = await supabase.from("ai_models_config").delete().eq("id", id);
      if (error2) throw error2;
      await loadModels();
      await addLog("warning", `Модель удалена: ${modelName}`);
    } catch (err) {
      console.error("Ошибка удаления модели:", err);
      throw new Error("Не удалось удалить модель");
    }
  };
  const addLog = async (level, message, modelName, processingTime) => {
    try {
      await supabase.rpc("add_ai_log", {
        p_level: level,
        p_message: message,
        p_model_name: modelName,
        p_processing_time: processingTime
      });
    } catch (err) {
      console.error("Ошибка добавления лога:", err);
    }
  };
  const updateStats = async (queries = 1, success = true, responseTime) => {
    try {
      await supabase.rpc("update_ai_stats", {
        p_queries: queries,
        p_success: success,
        p_response_time: responseTime
      });
      await loadStats();
    } catch (err) {
      console.error("Ошибка обновления статистики:", err);
    }
  };
  const exportData = async (type) => {
    try {
      let data;
      let filename;
      switch (type) {
        case "stats":
          data = stats;
          filename = `ai_stats_${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.json`;
          break;
        case "logs":
          data = logs;
          filename = `ai_logs_${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.json`;
          break;
        case "config":
          data = { models, moderationConfig };
          filename = `ai_config_${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.json`;
          break;
        case "weights":
          data = weights;
          filename = `ai_weights_${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.json`;
          break;
      }
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
      await addLog("info", `Экспорт данных: ${type}`);
    } catch (err) {
      console.error("Ошибка экспорта:", err);
      throw new Error("Не удалось экспортировать данные");
    }
  };
  const clearCache = async (type) => {
    try {
      await addLog("info", `Очистка кэша: ${type}`);
      if (type === "all") {
        setStats(null);
        setModels([]);
        setWeights([]);
        setLogs([]);
        setModerationConfig(null);
        await loadAll();
      }
    } catch (err) {
      console.error("Ошибка очистки кэша:", err);
      throw new Error("Не удалось очистить кэш");
    }
  };
  const resetSettings = async () => {
    try {
      const defaultConfig = {
        auto_moderation_enabled: true,
        spam_filter_enabled: true,
        toxicity_filter_enabled: true,
        threat_detection_enabled: false,
        severity_level: "medium",
        violation_action: "hide",
        toxicity_threshold: 70,
        spam_threshold: 80,
        abuse_threshold: 60
      };
      await updateModerationConfig(defaultConfig);
      await addLog("warning", "Настройки сброшены до значений по умолчанию");
    } catch (err) {
      console.error("Ошибка сброса настроек:", err);
      throw new Error("Не удалось сбросить настройки");
    }
  };
  const loadAll = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await Promise.all([
        loadStats(),
        loadModels(),
        loadWeights(),
        loadLogs(),
        loadModerationConfig()
      ]);
    } catch (err) {
      console.error("Ошибка загрузки данных:", err);
    } finally {
      setIsLoading(false);
    }
  };
  const refreshData = async () => {
    await loadAll();
    await addLog("info", "Данные обновлены");
  };
  reactExports.useEffect(() => {
    loadAll();
    const interval = setInterval(() => {
      loadStats();
      loadLogs();
    }, 3e4);
    return () => clearInterval(interval);
  }, []);
  return {
    // Данные
    stats,
    models,
    weights,
    logs,
    moderationConfig,
    isLoading,
    error,
    // Методы
    updateModel,
    updateWeight,
    updateModerationConfig,
    addModel,
    deleteModel,
    addLog,
    updateStats,
    exportData,
    clearCache,
    resetSettings,
    refreshData,
    loadAll
  };
};
function createContextScope(scopeName, createContextScopeDeps = []) {
  let defaultContexts = [];
  function createContext3(rootComponentName, defaultContext) {
    const BaseContext = reactExports.createContext(defaultContext);
    const index = defaultContexts.length;
    defaultContexts = [...defaultContexts, defaultContext];
    function Provider(props) {
      const { scope, children, ...context } = props;
      const Context = scope?.[scopeName][index] || BaseContext;
      const value = reactExports.useMemo(() => context, Object.values(context));
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Context.Provider, { value, children });
    }
    function useContext2(consumerName, scope) {
      const Context = scope?.[scopeName][index] || BaseContext;
      const context = reactExports.useContext(Context);
      if (context) return context;
      if (defaultContext !== void 0) return defaultContext;
      throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
    }
    Provider.displayName = rootComponentName + "Provider";
    return [Provider, useContext2];
  }
  const createScope = () => {
    const scopeContexts = defaultContexts.map((defaultContext) => {
      return reactExports.createContext(defaultContext);
    });
    return function useScope(scope) {
      const contexts = scope?.[scopeName] || scopeContexts;
      return reactExports.useMemo(
        () => ({ [`__scope${scopeName}`]: { ...scope, [scopeName]: contexts } }),
        [scope, contexts]
      );
    };
  };
  createScope.scopeName = scopeName;
  return [createContext3, composeContextScopes(createScope, ...createContextScopeDeps)];
}
function composeContextScopes(...scopes) {
  const baseScope = scopes[0];
  if (scopes.length === 1) return baseScope;
  const createScope = () => {
    const scopeHooks = scopes.map((createScope2) => ({
      useScope: createScope2(),
      scopeName: createScope2.scopeName
    }));
    return function useComposedScopes(overrideScopes) {
      const nextScopes = scopeHooks.reduce((nextScopes2, { useScope, scopeName }) => {
        const scopeProps = useScope(overrideScopes);
        const currentScope = scopeProps[`__scope${scopeName}`];
        return { ...nextScopes2, ...currentScope };
      }, {});
      return reactExports.useMemo(() => ({ [`__scope${baseScope.scopeName}`]: nextScopes }), [nextScopes]);
    };
  };
  createScope.scopeName = baseScope.scopeName;
  return createScope;
}
var PROGRESS_NAME = "Progress";
var DEFAULT_MAX = 100;
var [createProgressContext, createProgressScope] = createContextScope(PROGRESS_NAME);
var [ProgressProvider, useProgressContext] = createProgressContext(PROGRESS_NAME);
var Progress$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeProgress,
      value: valueProp = null,
      max: maxProp,
      getValueLabel = defaultGetValueLabel,
      ...progressProps
    } = props;
    if ((maxProp || maxProp === 0) && !isValidMaxNumber(maxProp)) {
      console.error(getInvalidMaxError(`${maxProp}`, "Progress"));
    }
    const max = isValidMaxNumber(maxProp) ? maxProp : DEFAULT_MAX;
    if (valueProp !== null && !isValidValueNumber(valueProp, max)) {
      console.error(getInvalidValueError(`${valueProp}`, "Progress"));
    }
    const value = isValidValueNumber(valueProp, max) ? valueProp : null;
    const valueLabel = isNumber(value) ? getValueLabel(value, max) : void 0;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressProvider, { scope: __scopeProgress, value, max, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "aria-valuemax": max,
        "aria-valuemin": 0,
        "aria-valuenow": isNumber(value) ? value : void 0,
        "aria-valuetext": valueLabel,
        role: "progressbar",
        "data-state": getProgressState(value, max),
        "data-value": value ?? void 0,
        "data-max": max,
        ...progressProps,
        ref: forwardedRef
      }
    ) });
  }
);
Progress$1.displayName = PROGRESS_NAME;
var INDICATOR_NAME = "ProgressIndicator";
var ProgressIndicator = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeProgress, ...indicatorProps } = props;
    const context = useProgressContext(INDICATOR_NAME, __scopeProgress);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "data-state": getProgressState(context.value, context.max),
        "data-value": context.value ?? void 0,
        "data-max": context.max,
        ...indicatorProps,
        ref: forwardedRef
      }
    );
  }
);
ProgressIndicator.displayName = INDICATOR_NAME;
function defaultGetValueLabel(value, max) {
  return `${Math.round(value / max * 100)}%`;
}
function getProgressState(value, maxValue) {
  return value == null ? "indeterminate" : value === maxValue ? "complete" : "loading";
}
function isNumber(value) {
  return typeof value === "number";
}
function isValidMaxNumber(max) {
  return isNumber(max) && !isNaN(max) && max > 0;
}
function isValidValueNumber(value, max) {
  return isNumber(value) && !isNaN(value) && value <= max && value >= 0;
}
function getInvalidMaxError(propValue, componentName) {
  return `Invalid prop \`max\` of value \`${propValue}\` supplied to \`${componentName}\`. Only numbers greater than 0 are valid max values. Defaulting to \`${DEFAULT_MAX}\`.`;
}
function getInvalidValueError(propValue, componentName) {
  return `Invalid prop \`value\` of value \`${propValue}\` supplied to \`${componentName}\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or ${DEFAULT_MAX} if no \`max\` prop is set)
  - \`null\` or \`undefined\` if the progress is indeterminate.

Defaulting to \`null\`.`;
}
var Root = Progress$1;
var Indicator = ProgressIndicator;
const Progress = reactExports.forwardRef(({ className, value, indicatorClassName, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Root,
  {
    ref,
    className: cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Indicator,
      {
        className: cn("h-full w-full flex-1 bg-primary transition-all", indicatorClassName),
        style: { transform: `translateX(-${100 - (value || 0)}%)` }
      }
    )
  }
));
Progress.displayName = Root.displayName;
const AIAnalyticsAdminDashboard = ({ onClose }) => {
  useLanguage$1();
  useToast();
  const [activeTab, setActiveTab] = reactExports.useState("overview");
  const [selectedModel, setSelectedModel] = reactExports.useState("");
  const [isActionLoading, setIsActionLoading] = reactExports.useState(false);
  reactExports.useState({
    model_name: "",
    model_type: "sentiment",
    huggingface_model: "",
    confidence_threshold: 0.7,
    max_text_length: 512,
    performance_mode: "balanced"
  });
  const {
    stats,
    models,
    weights,
    logs,
    moderationConfig,
    isLoading,
    error,
    updateModel,
    updateWeight,
    updateModerationConfig,
    addModel,
    deleteModel,
    exportData,
    clearCache,
    resetSettings,
    refreshData
  } = useAIAnalytics();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 p-4 max-w-7xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "ghost",
          size: "sm",
          onClick: onClose,
          className: "flex items-center gap-2 hover:bg-accent",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Назад" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-xl sm:text-2xl lg:text-3xl font-bold flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "w-5 h-5 sm:w-6 sm:h-6" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Панель управления AI-аналитикой" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sm:hidden", children: "AI Панель" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground hidden md:block", children: "Управление моделями машинного обучения и настройками анализа" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 sm:p-4 lg:p-6 max-w-7xl mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { value: activeTab, onValueChange: setActiveTab, className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "gap-1 bg-transparent w-max min-w-full flex", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TabsTrigger,
          {
            value: "overview",
            className: "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full data-[state=active]:shadow-none flex items-center gap-2 whitespace-nowrap px-3 py-2",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-4 h-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Обзор" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TabsTrigger,
          {
            value: "models",
            className: "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full data-[state=active]:shadow-none flex items-center gap-2 whitespace-nowrap px-3 py-2",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "w-4 h-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Модели" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TabsTrigger,
          {
            value: "moderation",
            className: "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full data-[state=active]:shadow-none flex items-center gap-2 whitespace-nowrap px-3 py-2",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-4 h-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Модерация" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TabsTrigger,
          {
            value: "weights",
            className: "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full data-[state=active]:shadow-none flex items-center gap-2 whitespace-nowrap px-3 py-2",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "w-4 h-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Веса" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TabsTrigger,
          {
            value: "logs",
            className: "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full data-[state=active]:shadow-none flex items-center gap-2 whitespace-nowrap px-3 py-2",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-4 h-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Логи" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TabsTrigger,
          {
            value: "data",
            className: "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full data-[state=active]:shadow-none flex items-center gap-2 whitespace-nowrap px-3 py-2",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Database, { className: "w-4 h-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Данные" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TabsTrigger,
          {
            value: "guide",
            className: "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full data-[state=active]:shadow-none flex items-center gap-2 whitespace-nowrap px-3 py-2",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-4 h-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Руководство" })
            ]
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "overview", className: "space-y-4", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center py-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SemipolarSpinner, { size: "lg" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-3 text-lg", children: "Загрузка данных..." })
      ] }) : error ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-red-500", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-6 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-12 h-12 text-red-500 mx-auto mb-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-red-500 mb-2", children: "Ошибка загрузки данных" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-4", children: error }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: refreshData, variant: "outline", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4 mr-2" }),
          "Попробовать снова"
        ] })
      ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold", children: "Обзор системы" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: refreshData, variant: "outline", size: "sm", disabled: isActionLoading, children: [
            isActionLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 hidden sm:inline", children: "Обновить" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-l-4 border-l-blue-500", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base sm:text-lg flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-5 h-5 text-blue-500" }),
              "Статистика запросов"
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Всего запросов сегодня" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl sm:text-2xl font-bold", children: stats?.totalQueries?.toLocaleString() || "0" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Среднее время ответа" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl sm:text-2xl font-bold", children: stats?.avgResponseTime ? `${(stats.avgResponseTime / 1e3).toFixed(1)}s` : "0s" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Успешность обработки" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xl sm:text-2xl font-bold text-green-500", children: [
                  stats?.totalQueries ? Math.round(stats.successfulQueries / stats.totalQueries * 100) : 0,
                  "%"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Progress,
                {
                  value: stats?.totalQueries ? stats.successfulQueries / stats.totalQueries * 100 : 0,
                  className: "mt-2"
                }
              )
            ] }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-l-4 border-l-yellow-500", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base sm:text-lg flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-5 h-5 text-yellow-500" }),
              "Нагрузка на систему"
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Cpu, { className: "w-4 h-4 text-muted-foreground" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "CPU" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xl sm:text-2xl font-bold", children: [
                    stats?.cpuUsage || 0,
                    "%"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: stats?.cpuUsage || 0, className: "h-2" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(HardDrive, { className: "w-4 h-4 text-muted-foreground" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "RAM" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xl sm:text-2xl font-bold", children: [
                  stats?.ramUsage || 0,
                  "GB"
                ] })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-4 h-4 text-muted-foreground" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "GPU" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xl sm:text-2xl font-bold", children: [
                    stats?.gpuUsage || 0,
                    "%"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: stats?.gpuUsage || 0, className: "h-2" })
              ] })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-l-4 border-l-purple-500", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base sm:text-lg flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "w-5 h-5 text-purple-500" }),
              "Статус моделей"
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
              models.length > 0 ? models.slice(0, 3).map((model) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  model.is_active ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4 text-green-500" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-4 h-4 text-red-500" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: model.model_name })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: "outline",
                    className: model.is_active ? "text-green-500 border-green-500" : "text-red-500 border-red-500",
                    children: model.is_active ? "Активна" : "Неактивна"
                  }
                )
              ] }, model.id)) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Модели не найдены" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  className: "w-full mt-2",
                  variant: "outline",
                  size: "sm",
                  onClick: () => setActiveTab("models"),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-2" }),
                    "Управление моделями"
                  ]
                }
              )
            ] }) })
          ] })
        ] }),
        stats && (stats.moderationActions > 0 || stats.spamDetected > 0 || stats.toxicityDetected > 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-l-4 border-l-orange-500", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base sm:text-lg flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-5 h-5 text-orange-500" }),
            "Активность модерации"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-blue-500", children: stats.moderationActions }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: "Действий модерации" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-yellow-500", children: stats.spamDetected }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: "Спам обнаружен" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-red-500", children: stats.toxicityDetected }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: "Токсичность обнаружена" })
            ] })
          ] }) })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "models", className: "space-y-4 pb-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 xl:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "w-5 h-5" }),
              "Управление моделями"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Настройте параметры моделей и их использование в системе" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Выберите модель" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: selectedModel, onValueChange: setSelectedModel, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Выберите модель" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "distilbert", children: "DistilBERT - Анализ тональности" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "minilm", children: "MiniLM - Семантический поиск" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "new", children: "+ Добавить новую модель" })
                ] })
              ] })
            ] }),
            selectedModel !== "new" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Активна" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { defaultChecked: true })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Автоматическое обновление" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { defaultChecked: true })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Кэширование результатов" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { defaultChecked: true })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Порог уверенности" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "0.7" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Slider,
                  {
                    defaultValue: [0.7],
                    max: 1,
                    min: 0.1,
                    step: 0.1,
                    className: "w-full"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Максимальная длина текста" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { defaultValue: "512", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "256", children: "256 токенов" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "512", children: "512 токенов" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "1024", children: "1024 токена" })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Режим работы" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { defaultValue: "balanced", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "fast", children: "Быстрый (менее точный)" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "balanced", children: "Сбалансированный" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "accurate", children: "Точный (медленнее)" })
                  ] })
                ] })
              ] })
            ] }),
            selectedModel === "new" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Название модели" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(OptimizedInput, { placeholder: "Например: GPT-2 Small" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Тип модели" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { defaultValue: "sentiment", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "sentiment", children: "Анализ тональности" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "semantic", children: "Семантический поиск" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "classification", children: "Классификация" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "generation", children: "Генерация текста" })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Hugging Face модель" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(OptimizedInput, { placeholder: "Например: distilbert-base-uncased" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "w-full", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-2" }),
                "Добавить модель"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "flex-1", variant: "outline", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4 mr-2" }),
                "Обновить"
              ] }),
              selectedModel !== "new" && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "flex-1", variant: "destructive", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4 mr-2" }),
                "Удалить"
              ] })
            ] })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-5 h-5" }),
              "Настройки модерации"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Настройте параметры автоматической модерации контента" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Автомодерация чата" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { defaultChecked: true })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Фильтр спама" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { defaultChecked: true })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Фильтр токсичности" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { defaultChecked: true })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Уровень строгости модерации" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { defaultValue: "medium", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "low", children: "Низкий" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "medium", children: "Средний" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "high", children: "Высокий" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Действие при нарушении" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { defaultValue: "hide", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "hide", children: "Скрыть сообщение" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "delete", children: "Удалить сообщение" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "warn", children: "Предупредить пользователя" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "ban", children: "Заблокировать пользователя" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Пороговые значения" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "Токсичность" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "70%" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Slider, { defaultValue: [70], max: 100, step: 1 })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "Спам" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "80%" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Slider, { defaultValue: [80], max: 100, step: 1 })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "Оскорбления" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "60%" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Slider, { defaultValue: [60], max: 100, step: 1 })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "w-full", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-4 h-4 mr-2" }),
              "Сохранить настройки модерации"
            ] })
          ] }) })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "moderation", className: "space-y-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-5 h-5" }),
            "Расширенные настройки модерации"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Детальная настройка системы автоматической модерации" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-semibold flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-4 h-4" }),
              "Фильтры контента"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Анти-спам фильтр" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { defaultChecked: true })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Детектор токсичности" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { defaultChecked: true })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Фильтр нецензурной лексики" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { defaultChecked: true })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Детектор угроз" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, {})
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-semibold flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" }),
              "Автоматические действия"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Автоскрытие сообщений" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { defaultChecked: true })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Автопредупреждения" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { defaultChecked: true })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Временные блокировки" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, {})
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Уведомления админам" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { defaultChecked: true })
              ] })
            ] })
          ] })
        ] }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "weights", className: "space-y-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "w-5 h-5" }),
            "Настройка весов рисков"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Настройте влияние различных факторов на оценку рисков" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Вес времени суток" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: "1.5" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Slider, { defaultValue: [1.5], max: 2, min: 0, step: 0.1 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Влияние времени суток на оценку риска инцидента" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Вес погодных условий" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: "1.2" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Slider, { defaultValue: [1.2], max: 2, min: 0, step: 0.1 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Влияние погодных условий на вероятность инцидентов" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Вес исторических данных" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: "1.8" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Slider, { defaultValue: [1.8], max: 2, min: 0, step: 0.1 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Влияние исторической статистики на оценку рисков" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Вес плотности населения" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: "1.3" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Slider, { defaultValue: [1.3], max: 2, min: 0, step: 0.1 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Влияние плотности населения на оценку рисков" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Автоматическая корректировка весов" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { defaultChecked: true })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Учитывать сезонность" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { defaultChecked: true })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Учитывать праздничные дни" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { defaultChecked: true })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "w-full", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "w-4 h-4 mr-2" }),
            "Применить настройки"
          ] })
        ] }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "logs", className: "space-y-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-5 h-5" }),
            "Системные логи"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4 mr-2" }),
            "Обновить"
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, { className: "h-[400px] sm:h-[600px] w-full rounded-md border p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-green-500 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4 flex-shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "[2024-03-28 15:45:23] Система запущена успешно" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-green-500 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4 flex-shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "[2024-03-28 15:45:24] Модели инициализированы" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-yellow-500 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-4 h-4 flex-shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "[2024-03-28 15:47:12] Предупреждение: высокая нагрузка на GPU" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-green-500 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4 flex-shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "[2024-03-28 15:48:01] Автомодерация: обработано 150 сообщений" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-red-500 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-4 h-4 flex-shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "[2024-03-28 15:49:15] Ошибка: не удалось загрузить кэш модели" })
          ] })
        ] }) }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "data", className: "space-y-4 pb-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Database, { className: "w-5 h-5" }),
            "Управление данными"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Экспорт данных и управление кэшем системы" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Автоматическое резервное копирование" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { defaultChecked: true })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { defaultValue: "daily", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "hourly", children: "Каждый час" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "daily", children: "Ежедневно" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "weekly", children: "Еженедельно" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Экспорт данных" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", children: "Экспорт статистики" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", children: "Экспорт логов" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", children: "Экспорт конфигурации" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", children: "Экспорт весов" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Управление кэшем" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", children: "Очистить кэш моделей" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", children: "Очистить кэш результатов" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "destructive", children: "Сбросить все настройки" })
            ] })
          ] })
        ] }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "guide", className: "space-y-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-5 h-5" }),
              "Обзор функций"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Полное описание возможностей AI-аналитики" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-semibold flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "w-4 h-4 text-blue-500" }),
                "Модели машинного обучения"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
                "• ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "DistilBERT:" }),
                " Анализ тональности сообщений и комментариев",
                /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                "• ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "MiniLM:" }),
                " Семантический поиск и классификация контента",
                /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                "• ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Настройка порогов:" }),
                " Контроль точности и скорости обработки",
                /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                "• ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Кэширование:" }),
                " Ускорение повторных запросов"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-semibold flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-4 h-4 text-green-500" }),
                "Система модерации"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
                "• ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Автоматическая фильтрация:" }),
                " Спам, токсичность, угрозы",
                /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                "• ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Настраиваемые пороги:" }),
                " Гибкая настройка чувствительности",
                /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                "• ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Автодействия:" }),
                " Скрытие, предупреждения, блокировки",
                /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                "• ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Уведомления:" }),
                " Мгновенные алерты для администраторов"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-semibold flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "w-4 h-4 text-purple-500" }),
                "Веса рисков"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
                "• ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Временные факторы:" }),
                " Учет времени суток и дня недели",
                /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                "• ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Погодные условия:" }),
                " Влияние метеоусловий на безопасность",
                /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                "• ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Исторические данные:" }),
                " Анализ прошлых инцидентов",
                /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                "• ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Демографические факторы:" }),
                " Плотность населения, социальные зоны"
              ] })
            ] })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-5 h-5" }),
              "Аналитические возможности"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Инструменты анализа и мониторинга" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-semibold flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-4 h-4 text-blue-500" }),
                "Мониторинг в реальном времени"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
                "• ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Системные метрики:" }),
                " CPU, RAM, GPU нагрузка",
                /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                "• ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Производительность:" }),
                " Время ответа, успешность запросов",
                /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                "• ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Статистика использования:" }),
                " Количество обработанных запросов",
                /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                "• ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Статус моделей:" }),
                " Доступность и работоспособность"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-semibold flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Database, { className: "w-4 h-4 text-green-500" }),
                "Управление данными"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
                "• ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Экспорт отчетов:" }),
                " Статистика, логи, конфигурации",
                /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                "• ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Резервное копирование:" }),
                " Автоматическое сохранение данных",
                /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                "• ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Очистка кэша:" }),
                " Управление памятью системы",
                /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                "• ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Восстановление:" }),
                " Сброс настроек до заводских"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-semibold flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-4 h-4 text-yellow-500" }),
                "Логирование и отладка"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
                "• ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Системные события:" }),
                " Запуск, остановка, ошибки",
                /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                "• ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Цветовая кодировка:" }),
                " Быстрое визуальное определение типа события",
                /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                "• ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Фильтрация:" }),
                " Поиск по типу события или времени",
                /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                "• ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Экспорт логов:" }),
                " Сохранение для анализа"
              ] })
            ] })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "lg:col-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "w-5 h-5" }),
            "Рекомендации по использованию"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-green-600", children: "✅ Лучшие практики" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "text-sm text-muted-foreground space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Регулярно мониторьте системные метрики" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Настраивайте пороги модерации постепенно" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Используйте кэширование для повышения производительности" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Создавайте резервные копии конфигураций" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Анализируйте логи для выявления проблем" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-red-600", children: "⚠️ Важные предупреждения" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "text-sm text-muted-foreground space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Не устанавливайте слишком низкие пороги модерации" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Избегайте частого изменения весов рисков" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Мониторьте нагрузку на GPU при активном использовании" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Регулярно очищайте кэш для освобождения памяти" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Тестируйте изменения на небольшой выборке данных" })
              ] })
            ] })
          ] }) })
        ] })
      ] }) })
    ] }) })
  ] });
};
const AdminPanel = ({ onBack }) => {
  useAuth();
  const { t } = useLanguage();
  const { isMasterAdmin } = useUserRole();
  const [users, setUsers] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [isPushTesting, setIsPushTesting] = reactExports.useState(false);
  const [searchTerm, setSearchTerm] = reactExports.useState("");
  const [inputSearchTerm, setInputSearchTerm] = reactExports.useState("");
  const [newAdminEmail, setNewAdminEmail] = reactExports.useState("");
  const [inputNewAdminEmail, setInputNewAdminEmail] = reactExports.useState("");
  reactExports.useEffect(() => {
    const handler = setTimeout(() => {
      setSearchTerm(inputSearchTerm);
    }, 300);
    return () => clearTimeout(handler);
  }, [inputSearchTerm]);
  reactExports.useEffect(() => {
    const handler = setTimeout(() => {
      setNewAdminEmail(inputNewAdminEmail);
    }, 300);
    return () => clearTimeout(handler);
  }, [inputNewAdminEmail]);
  const [selectedRole, setSelectedRole] = reactExports.useState("all");
  const [selectedGroup, setSelectedGroup] = reactExports.useState("all");
  const [isAddAdminOpen, setIsAddAdminOpen] = reactExports.useState(false);
  const [blockDialogOpen, setBlockDialogOpen] = reactExports.useState(false);
  const [selectedUser, setSelectedUser] = reactExports.useState(null);
  const [blockDuration, setBlockDuration] = reactExports.useState("temporary");
  const [blockUntilDate, setBlockUntilDate] = reactExports.useState("");
  const [userDetailsOpen, setUserDetailsOpen] = reactExports.useState(false);
  const [userXPData, setUserXPData] = reactExports.useState(null);
  const [loadingXP, setLoadingXP] = reactExports.useState(false);
  const [stats, setStats] = reactExports.useState({
    totalUsers: 0,
    admins: 0,
    masterAdmins: 0,
    premiumUsers: 0,
    activeToday: 0
  });
  const [showAIAnalytics, setShowAIAnalytics] = reactExports.useState(false);
  reactExports.useEffect(() => {
    loadUsers();
    loadStats();
  }, []);
  const loadUsers = async () => {
    try {
      setLoading(true);
      const adminService = AdminService.getInstance();
      const usersData = await adminService.getUsers();
      setUsers(usersData);
    } catch (error) {
      console.error("Error loading users:", error);
      Jt.error("Ошибка загрузки пользователей");
    } finally {
      setLoading(false);
    }
  };
  const loadStats = async () => {
    try {
      const adminService = AdminService.getInstance();
      const statistics = await adminService.getStatistics();
      setStats({
        totalUsers: statistics.totalUsers,
        admins: statistics.admins,
        masterAdmins: statistics.masterAdmins,
        premiumUsers: statistics.premiumUsers,
        activeToday: statistics.activeToday
      });
    } catch (error) {
      console.error("Error loading stats:", error);
      Jt.error("Ошибка загрузки статистики");
      setStats({
        totalUsers: 0,
        admins: 0,
        masterAdmins: 0,
        premiumUsers: 0,
        activeToday: 0
      });
    }
  };
  const handleTestPushNotifications = async () => {
    try {
      setIsPushTesting(true);
      Jt.success("🧪 Тестирование", {
        description: "Отправляем тестовое уведомление..."
      });
      await testPushNotifications();
      Jt.success("✅ Тест завершён", {
        description: "Проверьте консоль для подробных результатов"
      });
    } catch (error) {
      console.error("Error testing push notifications:", error);
      Jt.error("❌ Ошибка теста", {
        description: "Ошибка при тестировании уведомлений"
      });
    } finally {
      setIsPushTesting(false);
    }
  };
  const blockUser = async (userId, until) => {
    try {
      const adminService = AdminService.getInstance();
      await adminService.blockUser(userId, until);
      Jt.success(until ? "Пользователь временно заблокирован" : "Пользователь заблокирован");
      loadUsers();
    } catch (error) {
      console.error("Error blocking user:", error);
      Jt.error("Ошибка при блокировке пользователя");
    }
  };
  const unblockUser = async (userId) => {
    try {
      const adminService = AdminService.getInstance();
      await adminService.unblockUser(userId);
      Jt.success("Пользователь разблокирован");
      loadUsers();
    } catch (error) {
      console.error("Error unblocking user:", error);
      Jt.error("Ошибка при разблокировке пользователя");
    }
  };
  const deleteUser = async (userId) => {
    if (!window.confirm("Вы уверены, что хотите удалить этого пользователя? Это действие нельзя отменить.")) {
      return;
    }
    try {
      const adminService = AdminService.getInstance();
      await adminService.deleteUser(userId);
      Jt.success("Пользователь и все его данные удалены");
      loadUsers();
      loadStats();
    } catch (error) {
      console.error("Error deleting user:", error);
      Jt.error("Ошибка удаления пользователя");
    }
  };
  const addAdmin = async () => {
    if (!newAdminEmail.trim()) {
      Jt.error("Введите email пользователя");
      return;
    }
    try {
      const adminService = AdminService.getInstance();
      await adminService.addAdmin(newAdminEmail.trim());
      Jt.success("Пользователь назначен администратором");
      setNewAdminEmail("");
      setInputNewAdminEmail("");
      setIsAddAdminOpen(false);
      loadUsers();
      loadStats();
    } catch (error) {
      console.error("Error adding admin:", error);
      Jt.error(error instanceof Error ? error.message : "Ошибка назначения администратора");
    }
  };
  const getRoleBadge = (role) => {
    switch (role) {
      case "master_admin":
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-purple-600 text-white", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "w-3 h-3 mr-1" }),
          "Мастер Админ"
        ] });
      case "admin":
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-blue-600 text-white", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-3 h-3 mr-1" }),
          "Админ"
        ] });
      default:
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", children: "Пользователь" });
    }
  };
  const getPremiumBadge = (isPremium, premiumUntil) => {
    if (!isPremium) return null;
    const isExpired = premiumUntil && new Date(premiumUntil) < /* @__PURE__ */ new Date();
    if (isExpired) return null;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-gradient-to-r from-yellow-500 to-orange-500 text-white ml-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-3 h-3 mr-1" }),
      "PRO"
    ] });
  };
  const getUserInitials = (name, email) => {
    if (name) {
      return name.split(" ").map((n) => n[0]).join("").toUpperCase();
    }
    return email.substring(0, 2).toUpperCase();
  };
  const getGroupType = (user2) => {
    if (user2.role === "master_admin" || user2.role === "admin") return "admin";
    if (user2.is_premium && user2.premium_until && new Date(user2.premium_until) > /* @__PURE__ */ new Date()) return "premium";
    return "regular";
  };
  const getUserOnlineStatus = (user2) => {
    if (!user2.last_sign_in) return false;
    const lastSignIn = new Date(user2.last_sign_in);
    const now = /* @__PURE__ */ new Date();
    const timeDiff = now.getTime() - lastSignIn.getTime();
    const minutesDiff = timeDiff / (1e3 * 60);
    const baseOnline = minutesDiff < 30;
    const userIdHash = user2.id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const randomFactor = userIdHash % 100 / 100;
    return baseOnline || randomFactor > 0.7;
  };
  const loadUserXPData = async (userId) => {
    try {
      setLoadingXP(true);
      console.log("🔍 Loading XP data for user:", userId);
      const user2 = users.find((u) => u.id === userId);
      if (user2 && user2.total_xp !== void 0 && user2.current_level !== void 0) {
        console.log("📊 Using cached XP data from user list");
        const xpService2 = XPService.getInstance();
        const badgeService2 = BadgeService.getInstance();
        const totalXP2 = user2.total_xp || 0;
        const currentLevel2 = user2.current_level || 1;
        const userLevel2 = xpService2.getLevelByXP(totalXP2);
        const progressInfo2 = xpService2.getProgressToNextLevel(totalXP2, currentLevel2);
        const xpToNext2 = progressInfo2.nextLevelXP - progressInfo2.currentLevelXP;
        const { data: badgesData2, error: badgesError2 } = await supabase.from("user_badges").select("*").eq("user_id", userId);
        console.log("🏆 Badges result:", { badgesData: badgesData2, badgesError: badgesError2 });
        const userBadges2 = await Promise.all(
          badgesData2?.map(async (badge) => {
            const badgeInfo = await badgeService2.getBadgeInfo(badge.badge_id);
            return {
              id: badge.badge_id,
              name: badgeInfo?.name || badge.badge_id,
              emoji: badgeInfo?.emoji || "🏆",
              description: badgeInfo?.description || "Achievement unlocked",
              rarity: badgeInfo?.rarity || "common",
              earnedAt: new Date(badge.awarded_at)
            };
          }) || []
        );
        const finalUserXPData2 = {
          totalXP: totalXP2,
          level: userLevel2.level,
          levelName: userLevel2.name,
          emoji: userLevel2.emoji,
          xpToNextLevel: Math.max(0, xpToNext2),
          badges: userBadges2
        };
        console.log("✅ Final XP data:", finalUserXPData2);
        setUserXPData(finalUserXPData2);
        return;
      }
      console.log("🔄 Loading XP data from database...");
      const { data: xpData, error: xpError } = await supabase.from("user_xp").select("*").eq("user_id", userId).single();
      if (xpError && xpError.code !== "PGRST116") {
        console.error("❌ XP Error:", xpError);
        throw xpError;
      }
      const { data: badgesData, error: badgesError } = await supabase.from("user_badges").select("*").eq("user_id", userId);
      if (badgesError) {
        console.error("❌ Badges Error:", badgesError);
      }
      const xpService = XPService.getInstance();
      const badgeService = BadgeService.getInstance();
      const totalXP = xpData?.total_xp || 0;
      const currentLevel = xpData?.current_level || 1;
      const userLevel = xpService.getLevelByXP(totalXP);
      const progressInfo = xpService.getProgressToNextLevel(totalXP, currentLevel);
      const xpToNext = progressInfo.nextLevelXP - progressInfo.currentLevelXP;
      const userBadges = await Promise.all(
        badgesData?.map(async (badge) => {
          const badgeInfo = await badgeService.getBadgeInfo(badge.badge_id);
          return {
            id: badge.badge_id,
            name: badgeInfo?.name || badge.badge_id,
            emoji: badgeInfo?.emoji || "🏆",
            description: badgeInfo?.description || "Achievement unlocked",
            rarity: badgeInfo?.rarity || "common",
            earnedAt: new Date(badge.awarded_at)
          };
        }) || []
      );
      const finalUserXPData = {
        totalXP,
        level: userLevel.level,
        levelName: userLevel.name,
        emoji: userLevel.emoji,
        xpToNextLevel: Math.max(0, xpToNext),
        badges: userBadges
      };
      setUserXPData(finalUserXPData);
    } catch (error) {
      console.error("💥 Critical error loading user XP data:", error);
      const xpService = XPService.getInstance();
      const startingLevel = xpService.getLevelByXP(0);
      const startingProgress = xpService.getProgressToNextLevel(0, 1);
      const fallbackData = {
        totalXP: 0,
        level: startingLevel.level,
        levelName: startingLevel.name,
        emoji: startingLevel.emoji,
        xpToNextLevel: startingProgress.nextLevelXP,
        badges: []
      };
      console.log("🔄 Using fallback XP data:", fallbackData);
      setUserXPData(fallbackData);
    } finally {
      setLoadingXP(false);
    }
  };
  const filteredUsers = users.filter((user2) => {
    const matchesSearch = user2.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) || user2.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === "all" || user2.role === selectedRole;
    const matchesGroup = selectedGroup === "all" || getGroupType(user2) === selectedGroup;
    return matchesSearch && matchesRole && matchesGroup;
  });
  const groupedUsers = {
    admin: filteredUsers.filter((user2) => getGroupType(user2) === "admin"),
    premium: filteredUsers.filter((user2) => getGroupType(user2) === "premium"),
    regular: filteredUsers.filter((user2) => getGroupType(user2) === "regular")
  };
  const BlockUserDialog = () => /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: blockDialogOpen, onOpenChange: setBlockDialogOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Блокировка пользователя" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 py-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Тип блокировки" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Select,
          {
            value: blockDuration,
            onValueChange: (value) => setBlockDuration(value),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Выберите тип блокировки" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "temporary", children: "Временная" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "permanent", children: "Постоянная" })
              ] })
            ]
          }
        )
      ] }),
      blockDuration === "temporary" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Дата разблокировки" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          OptimizedInput,
          {
            type: "datetime-local",
            value: blockUntilDate,
            onChange: (e) => setBlockUntilDate(e.target.value),
            min: (/* @__PURE__ */ new Date()).toISOString().slice(0, 16)
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end space-x-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            onClick: () => setBlockDialogOpen(false),
            children: "Отмена"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "destructive",
            onClick: () => {
              if (selectedUser) {
                blockUser(selectedUser.id, blockDuration === "temporary" ? blockUntilDate : void 0);
                setBlockDialogOpen(false);
              }
            },
            children: "Заблокировать"
          }
        )
      ] })
    ] })
  ] }) });
  const UserDetailsDialog = () => /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: userDetailsOpen, onOpenChange: setUserDetailsOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "bg-card border-border max-w-2xl max-h-[80vh] overflow-y-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "text-white", children: "User Details" }) }),
    selectedUser && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Avatar, { className: "h-16 w-16", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarImage, { src: selectedUser.avatar_url || "" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "bg-blue-600 text-white text-xl", children: getUserInitials(selectedUser.full_name, selectedUser.email) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-white", children: selectedUser.full_name || "No name" }),
          getRoleBadge(selectedUser.role || "user")
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2 text-gray-400", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-4 h-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: selectedUser.email })
        ] }),
        selectedUser.phone && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2 text-gray-400", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-4 h-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: selectedUser.phone })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2 text-gray-400", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-4 h-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "Registered: ",
            new Date(selectedUser.created_at).toLocaleDateString()
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2 text-gray-400", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-4 h-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "Status: ",
            selectedUser.is_blocked ? selectedUser.blocked_until ? `Blocked until ${new Date(selectedUser.blocked_until).toLocaleDateString()}` : "Permanently blocked" : "Active"
          ] })
        ] }),
        selectedUser.last_sign_in && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2 text-gray-400", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-3 h-3 rounded-full ${getUserOnlineStatus(selectedUser) ? "bg-green-500" : "bg-red-500"}` }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            getUserOnlineStatus(selectedUser) ? "Online" : "Offline",
            " • Last seen: ",
            new Date(selectedUser.last_sign_in).toLocaleString()
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border pt-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-white font-semibold mb-3 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-4 h-4 text-yellow-500" }),
          "XP & Level Information"
        ] }),
        loadingXP ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-gray-400 text-sm", children: "Loading XP data..." }) : userXPData ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-gradient-to-r from-purple-500 to-blue-600 text-white px-3 py-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mr-1", children: userXPData.emoji }),
              "Lvl ",
              userXPData.level
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white font-medium", children: userXPData.levelName }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-gray-400 text-sm", children: [
                userXPData.totalXP.toLocaleString(),
                " XP total"
              ] })
            ] })
          ] }),
          userXPData.level < 50 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm mb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-gray-400", children: [
                "Progress to Level ",
                userXPData.level + 1
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-gray-400", children: [
                userXPData.xpToNextLevel,
                " XP needed"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full bg-gray-700 rounded-full h-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300",
                style: {
                  width: `${Math.max(10, 100 - userXPData.xpToNextLevel / 500 * 100)}%`
                }
              }
            ) })
          ] }),
          userXPData.badges.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-gray-400 text-sm mb-2", children: [
              "Earned Badges (",
              userXPData.badges.length,
              ")"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: userXPData.badges.map((badge) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center gap-1 bg-dark/50 rounded-lg px-2 py-1 border border-border",
                title: `${badge.description} • Earned: ${badge.earnedAt.toLocaleDateString()}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: badge.emoji }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-gray-300", children: badge.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      className: `text-xs px-1 py-0 ${badge.rarity === "legendary" ? "bg-yellow-600" : badge.rarity === "epic" ? "bg-purple-600" : badge.rarity === "rare" ? "bg-blue-600" : badge.rarity === "uncommon" ? "bg-green-600" : "bg-gray-600"}`,
                      children: badge.rarity
                    }
                  )
                ]
              },
              badge.id
            )) })
          ] })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-gray-400 text-sm", children: "No XP data available" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-4 flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "outline",
          onClick: () => {
            setUserDetailsOpen(false);
            setUserXPData(null);
          },
          className: "text-gray-400 hover:text-white",
          children: "Close"
        }
      ) })
    ] })
  ] }) });
  const renderUserActions = (user2) => /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenu, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(EllipsisVertical, { className: "w-4 h-4" }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuContent, { align: "end", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        DropdownMenuItem,
        {
          onClick: () => {
            setSelectedUser(user2);
            setUserDetailsOpen(true);
            loadUserXPData(user2.id);
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "w-4 h-4 mr-2" }),
            "View Details"
          ]
        }
      ),
      user2.is_blocked ? /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { onClick: () => unblockUser(user2.id), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(UserCheck, { className: "w-4 h-4 mr-2" }),
        "Unblock"
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
        DropdownMenuItem,
        {
          onClick: () => {
            setSelectedUser(user2);
            setBlockDialogOpen(true);
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-4 h-4 mr-2" }),
            "Block"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        DropdownMenuItem,
        {
          onClick: () => deleteUser(user2.id),
          className: "text-red-500",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4 mr-2" }),
            "Delete"
          ]
        }
      )
    ] })
  ] });
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-dark p-4 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white", children: "Загрузка..." }) });
  }
  if (showAIAnalytics) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(AIAnalyticsAdminDashboard, { onClose: () => setShowAIAnalytics(false) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-dark p-4 pb-24", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "ghost",
            size: "icon",
            onClick: onBack,
            className: "text-white hover:bg-dark-light",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-5 w-5" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-white", children: "Admin Panel" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400", children: "User and Role Management" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        isMasterAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            className: "bg-purple-600 hover:bg-purple-700 text-white",
            onClick: () => setShowAIAnalytics(true),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "w-4 h-4 mr-2" }),
              "Открыть панель AI-аналитики"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-8 w-8 text-blue-500" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-5 gap-4 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Card,
        {
          className: "profile-card-neumorph",
          style: {
            borderRadius: "14px",
            background: "#1e2327",
            boxShadow: "inset -5px 5px 9px #14171a, inset 5px -5px 9px #282f34",
            border: "1px solid #23272b"
          },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-5 w-5 text-blue-500" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-400", children: "Total Users" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-bold text-white", children: stats.totalUsers })
            ] })
          ] }) })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Card,
        {
          className: "profile-card-neumorph",
          style: {
            borderRadius: "14px",
            background: "#1e2327",
            boxShadow: "inset -5px 5px 9px #14171a, inset 5px -5px 9px #282f34",
            border: "1px solid #23272b"
          },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-5 w-5 text-green-500" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-400", children: "Admins" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-bold text-white", children: stats.admins })
            ] })
          ] }) })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Card,
        {
          className: "profile-card-neumorph",
          style: {
            borderRadius: "14px",
            background: "#1e2327",
            boxShadow: "inset -5px 5px 9px #14171a, inset 5px -5px 9px #282f34",
            border: "1px solid #23272b"
          },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "h-5 w-5 text-purple-500" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-400", children: "Master Admins" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-bold text-white", children: stats.masterAdmins })
            ] })
          ] }) })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Card,
        {
          className: "profile-card-neumorph",
          style: {
            borderRadius: "14px",
            background: "#1e2327",
            boxShadow: "inset -5px 5px 9px #14171a, inset 5px -5px 9px #282f34",
            border: "1px solid #23272b"
          },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-5 w-5 text-yellow-500" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-400", children: "Premium Users" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-bold text-white", children: stats.premiumUsers })
            ] })
          ] }) })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Card,
        {
          className: "profile-card-neumorph",
          style: {
            borderRadius: "14px",
            background: "#1e2327",
            boxShadow: "inset -5px 5px 9px #14171a, inset 5px -5px 9px #282f34",
            border: "1px solid #23272b"
          },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(UserCheck, { className: "h-5 w-5 text-orange-500" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-400", children: "Active Today" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-bold text-white", children: stats.activeToday })
            ] })
          ] }) })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card/90 border-border mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2 text-white", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "h-5 w-5" }),
        "Push Уведомления"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col sm:flex-row gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            onClick: handleTestPushNotifications,
            disabled: isPushTesting,
            className: "flex items-center gap-2",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "h-4 w-4" }),
              isPushTesting ? "Тестирование..." : "Тест уведомлений"
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-gray-400", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            "• ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Автоматическая регистрация:" }),
            " FCM токен создается автоматически при входе в приложение"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            "• ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Тест уведомлений:" }),
            " Отправить тестовое push уведомление для проверки работы системы"
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card/90 border-border mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          OptimizedInput,
          {
            textType: "search",
            placeholder: t("searchByEmailOrName"),
            value: inputSearchTerm,
            onChange: (e) => setInputSearchTerm(e.target.value),
            className: "bg-background text-foreground pl-10"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: selectedRole, onValueChange: setSelectedRole, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-40 bg-dark-light border-border text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Role" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { className: "bg-card border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Roles" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "user", children: "Users" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "admin", children: "Admins" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "master_admin", children: "Master Admins" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: selectedGroup, onValueChange: setSelectedGroup, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-40 bg-dark-light border-border text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Group" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { className: "bg-card border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Groups" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "admin", children: "Admins" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "premium", children: "Premium" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "regular", children: "Regular" })
        ] })
      ] }),
      isMasterAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open: isAddAdminOpen, onOpenChange: setIsAddAdminOpen, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "bg-blue-600 hover:bg-blue-700 text-white", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "h-4 w-4 mr-2" }),
          "Add Admin"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "bg-card border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "text-white", children: "Assign Administrator" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "email", children: "Email пользователя" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                OptimizedInput,
                {
                  id: "email",
                  value: inputNewAdminEmail,
                  onChange: (e) => setInputNewAdminEmail(e.target.value),
                  placeholder: "user@example.com"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: addAdmin, disabled: !newAdminEmail.trim(), children: "Добавить администратора" })
          ] })
        ] })
      ] })
    ] }) }) }),
    selectedGroup === "all" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      groupedUsers.admin.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Card,
        {
          className: "profile-card-neumorph mb-4",
          style: {
            borderRadius: "14px",
            background: "#1e2327",
            boxShadow: "inset -5px 5px 9px #14171a, inset 5px -5px 9px #282f34",
            border: "1px solid #23272b"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-white flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-5 w-5 text-green-500" }),
              "Administrators (",
              groupedUsers.admin.length,
              ")"
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: groupedUsers.admin.map((user2) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-4 hover:bg-dark-light transition-colors border-b border-border last:border-b-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Avatar, { className: "h-10 w-10", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarImage, { src: user2.avatar_url || "" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "bg-blue-600 text-white", children: getUserInitials(user2.full_name, user2.email) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `absolute -bottom-0.5 -right-0.5 w-3 h-3 border-2 border-dark rounded-full ${getUserOnlineStatus(user2) ? "bg-green-500" : "bg-red-500"}` })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-medium", children: user2.full_name || "No name" }),
                    getRoleBadge(user2.role || "user"),
                    getPremiumBadge(user2.is_premium || false, user2.premium_until)
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-400", children: user2.email }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-gray-500", children: [
                    "Registered: ",
                    new Date(user2.created_at).toLocaleDateString()
                  ] })
                ] })
              ] }),
              renderUserActions(user2)
            ] }, user2.id)) }) })
          ]
        }
      ),
      groupedUsers.premium.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Card,
        {
          className: "profile-card-neumorph mb-4",
          style: {
            borderRadius: "14px",
            background: "#1e2327",
            boxShadow: "inset -5px 5px 9px #14171a, inset 5px -5px 9px #282f34",
            border: "1px solid #23272b"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-white flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-5 w-5 text-yellow-500" }),
              "Premium Users (",
              groupedUsers.premium.length,
              ")"
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: groupedUsers.premium.map((user2) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-4 hover:bg-dark-light transition-colors border-b border-border last:border-b-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Avatar, { className: "h-10 w-10", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarImage, { src: user2.avatar_url || "" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "bg-gradient-to-r from-yellow-500 to-orange-500 text-white", children: getUserInitials(user2.full_name, user2.email) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `absolute -bottom-0.5 -right-0.5 w-3 h-3 border-2 border-dark rounded-full ${getUserOnlineStatus(user2) ? "bg-green-500" : "bg-red-500"}` })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-medium", children: user2.full_name || "No name" }),
                    getRoleBadge(user2.role || "user"),
                    getPremiumBadge(user2.is_premium || false, user2.premium_until)
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-400", children: user2.email }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-gray-500", children: [
                    "Registered: ",
                    new Date(user2.created_at).toLocaleDateString(),
                    user2.premium_until && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-yellow-400 ml-2", children: [
                      "• Premium until ",
                      new Date(user2.premium_until).toLocaleDateString()
                    ] })
                  ] })
                ] })
              ] }),
              renderUserActions(user2)
            ] }, user2.id)) }) })
          ]
        }
      ),
      groupedUsers.regular.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Card,
        {
          className: "profile-card-neumorph",
          style: {
            borderRadius: "14px",
            background: "#1e2327",
            boxShadow: "inset -5px 5px 9px #14171a, inset 5px -5px 9px #282f34",
            border: "1px solid #23272b"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-white flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-5 w-5 text-blue-500" }),
              "Regular Users (",
              groupedUsers.regular.length,
              ")"
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: groupedUsers.regular.map((user2) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-4 hover:bg-dark-light transition-colors border-b border-border last:border-b-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Avatar, { className: "h-10 w-10", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarImage, { src: user2.avatar_url || "" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "bg-gray-600 text-white", children: getUserInitials(user2.full_name, user2.email) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `absolute -bottom-0.5 -right-0.5 w-3 h-3 border-2 border-dark rounded-full ${getUserOnlineStatus(user2) ? "bg-green-500" : "bg-red-500"}` })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-medium", children: user2.full_name || "No name" }),
                    getRoleBadge(user2.role || "user")
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-400", children: user2.email }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-gray-500", children: [
                    "Registered: ",
                    new Date(user2.created_at).toLocaleDateString()
                  ] })
                ] })
              ] }),
              renderUserActions(user2)
            ] }, user2.id)) }) })
          ]
        }
      )
    ] }) : (
      /* Single Group View */
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Card,
        {
          className: "profile-card-neumorph",
          style: {
            borderRadius: "14px",
            background: "#1e2327",
            boxShadow: "inset -5px 5px 9px #14171a, inset 5px -5px 9px #282f34",
            border: "1px solid #23272b"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-white", children: [
              selectedGroup === "admin" && "Administrators",
              selectedGroup === "premium" && "Premium Users",
              selectedGroup === "regular" && "Regular Users",
              " ",
              "(",
              filteredUsers.length,
              ")"
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: filteredUsers.map((user2) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-4 hover:bg-dark-light transition-colors border-b border-border last:border-b-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(Avatar, { className: "h-10 w-10", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarImage, { src: user2.avatar_url || "" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: getGroupType(user2) === "admin" ? "bg-blue-600 text-white" : getGroupType(user2) === "premium" ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-white" : "bg-gray-600 text-white", children: getUserInitials(user2.full_name, user2.email) })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `absolute -bottom-0.5 -right-0.5 w-3 h-3 border-2 border-dark rounded-full ${getUserOnlineStatus(user2) ? "bg-green-500" : "bg-red-500"}` })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-medium", children: user2.full_name || "No name" }),
                      getRoleBadge(user2.role || "user"),
                      getPremiumBadge(user2.is_premium || false, user2.premium_until)
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-400", children: user2.email }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-gray-500", children: [
                      "Registered: ",
                      new Date(user2.created_at).toLocaleDateString(),
                      user2.premium_until && getGroupType(user2) === "premium" && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-yellow-400 ml-2", children: [
                        "• Premium until ",
                        new Date(user2.premium_until).toLocaleDateString()
                      ] })
                    ] })
                  ] })
                ] }),
                renderUserActions(user2)
              ] }, user2.id)) }),
              filteredUsers.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-8 text-gray-400", children: "No users found" })
            ] })
          ]
        }
      )
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(BlockUserDialog, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(UserDetailsDialog, {})
  ] });
};
const APP_VERSION = "1.0.0";
const BUILD_NUMBER = "2025.01.25.001";
const AboutAppDialog = ({ open, onOpenChange }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "bg-card border-border max-w-2xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "text-white flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "w-5 h-5" }),
      "About Radar App"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, { className: "max-h-[70vh] pr-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center text-center space-y-3 py-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: "https://i.ibb.co/Cs02JMtj/A-20250622-231910-0000.png",
            alt: "Radar Logo",
            className: "w-24 h-24 object-contain"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-semibold text-white", children: "Radar App" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-gray-400", children: [
            "Version ",
            APP_VERSION,
            " (Build ",
            BUILD_NUMBER,
            ")"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-lg font-medium text-white flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "w-4 h-4" }),
          "About"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400 text-sm", children: "RADAR App is a community-driven safety platform designed to help keep neighborhoods secure and informed." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-lg font-medium text-white flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-4 h-4" }),
          "Features"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "text-gray-400 text-sm space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Real-time community alerts" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Interactive safety map" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Community discussion threads" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Anonymous reporting" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Smart notifications" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-lg font-medium text-white flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-4 h-4" }),
          "Supported Languages"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "text-gray-400 text-sm space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• English" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Spanish" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-lg font-medium text-white flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Scale, { className: "w-4 h-4" }),
          "Legal Information"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "text-gray-400 text-sm space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Copyright © RADAR App 2025" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Patent No: RAD-2025-001" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• All Rights Reserved" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-lg font-medium text-white flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-4 h-4" }),
          "Credits"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "text-gray-400 text-sm space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Developed by RADAR Team" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Special thanks to our contributors" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Last updated: January 2025" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-lg font-medium text-white flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { className: "w-4 h-4" }),
          "Technical Information"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-dark-light rounded-lg p-3 font-mono text-xs text-gray-400", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            "App Version: ",
            APP_VERSION
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            "Build Number: ",
            BUILD_NUMBER
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Last Updated: January 25, 2025" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        variant: "outline",
        onClick: () => onOpenChange(false),
        className: "text-gray-400 hover:text-white",
        children: "Close"
      }
    ) })
  ] }) });
};
const TermsOfUseDialog = ({ open, onOpenChange }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "bg-card border-border max-w-2xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "text-white flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scale, { className: "w-5 h-5" }),
      "Terms of Use"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, { className: "h-[60vh] pr-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 pb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-lg font-medium text-white flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-4 h-4" }),
          "Introduction"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400 text-sm", children: "Welcome to RADAR App. By using our application, you agree to these terms of use. Please read them carefully." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-lg font-medium text-white flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(UserCheck, { className: "w-4 h-4" }),
          "User Responsibilities"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "text-gray-400 text-sm space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Provide accurate and truthful information" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Maintain the confidentiality of your account" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Report only genuine safety concerns" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Respect the privacy of others" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Follow community guidelines" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-lg font-medium text-white flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-4 h-4" }),
          "Safety Guidelines"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "text-gray-400 text-sm space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Verify information before reporting" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Do not share personal information" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Report emergency situations to authorities first" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Use anonymous reporting responsibly" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Follow local laws and regulations" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-lg font-medium text-white flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-4 h-4" }),
          "Privacy & Data"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "text-gray-400 text-sm space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• We collect location data for safety features" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Your data is stored securely" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• You control your privacy settings" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Data is used only for safety purposes" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• You can request data deletion" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-lg font-medium text-white flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-4 h-4" }),
          "Prohibited Activities"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "text-gray-400 text-sm space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• False reporting" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Harassment or bullying" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Sharing inappropriate content" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Spamming or advertising" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Attempting to hack or disrupt the service" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-lg font-medium text-white flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Scale, { className: "w-4 h-4" }),
          "Legal Notice"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400 text-sm", children: "RADAR App reserves the right to modify these terms at any time. Continued use of the application constitutes acceptance of any changes. These terms were last updated on January 25, 2025." })
      ] })
    ] }) })
  ] }) });
};
const PrivacyPolicyDialog = ({ open, onOpenChange }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "bg-card border-border max-w-2xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "text-white flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-5 h-5" }),
      "Privacy Policy"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, { className: "h-[60vh] pr-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 pb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-lg font-medium text-white flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-4 h-4" }),
          "Introduction"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400 text-sm", children: "At RADAR App, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal information. By using our application, you agree to the collection and use of information in accordance with this policy." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-lg font-medium text-white flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" }),
          "Information We Collect"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "text-gray-400 text-sm space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Account information (email, name if provided)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Location data (when using the app)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Device information" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Usage statistics" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Community reports and interactions" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-lg font-medium text-white flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Database, { className: "w-4 h-4" }),
          "How We Use Your Information"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "text-gray-400 text-sm space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Provide safety alerts and notifications" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Display relevant safety information on the map" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Improve our services and user experience" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Maintain community features" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Ensure platform security" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-lg font-medium text-white flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Map$1, { className: "w-4 h-4" }),
          "Location Services"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "text-gray-400 text-sm space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Location data is used only when the app is active" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• You can disable location services at any time" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Location history is not stored permanently" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Anonymous reporting hides your location from others" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-lg font-medium text-white flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "w-4 h-4" }),
          "Data Sharing"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "text-gray-400 text-sm space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• We never sell your personal data" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Data is shared only for app functionality" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Anonymous reports protect your identity" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Third-party services are carefully vetted" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-lg font-medium text-white flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-4 h-4" }),
          "Community Features"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "text-gray-400 text-sm space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Public posts are visible to all users" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Anonymous posting is available" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Report inappropriate content" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Moderation ensures community safety" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-lg font-medium text-white flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-4 h-4" }),
          "Notifications"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "text-gray-400 text-sm space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Safety alerts based on your location" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Community updates and announcements" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Customize notification preferences" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Opt-out options available" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-lg font-medium text-white flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(UserCheck, { className: "w-4 h-4" }),
          "Your Rights"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "text-gray-400 text-sm space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Access your personal data" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Request data correction" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Delete your account and data" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Control privacy settings" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Opt-out of non-essential features" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-lg font-medium text-white flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" }),
          "Data Deletion"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400 text-sm", children: "You can request complete deletion of your account and associated data at any time. Some information may be retained for legal or security purposes. Contact our support team for data deletion requests." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-lg font-medium text-white flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-4 h-4" }),
          "Updates to Privacy Policy"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400 text-sm", children: 'We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. Last Updated: January 25, 2025' })
      ] })
    ] }) })
  ] }) });
};
const ContactSupportDialog = ({ open, onOpenChange }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "bg-card border-border max-w-2xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "text-white flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Headphones, { className: "w-5 h-5" }),
      "Contact Support"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, { className: "h-[60vh] pr-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 pb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-lg font-medium text-white flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-4 h-4" }),
          "Official Telegram Channel"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-dark-light rounded-lg p-4 space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400 text-sm", children: "Join our official Telegram channel for the latest updates, announcements, and support:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              className: "w-full justify-center text-blue-400 hover:text-blue-300 hover:bg-blue-500/10",
              onClick: () => window.open("https://t.me/radar_alert", "_blank"),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-4 h-4 mr-2" }),
                "@radar_alert"
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-lg font-medium text-white flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4" }),
          "Support Hours"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "text-gray-400 text-sm space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Monday - Friday: 9:00 AM - 6:00 PM (GMT)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Saturday: 10:00 AM - 4:00 PM (GMT)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Emergency support available 24/7 for critical issues" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-lg font-medium text-white flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleHelp, { className: "w-4 h-4" }),
          "How to Get Help"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "text-gray-400 text-sm space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Join our Telegram channel for quick updates" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Check our FAQ section in the app" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Report technical issues through the app" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Contact moderators for community-related issues" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-lg font-medium text-white flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bug, { className: "w-4 h-4" }),
          "Report Technical Issues"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "text-gray-400 text-sm space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Provide detailed description of the issue" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Include steps to reproduce the problem" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Attach screenshots if possible" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Mention your device and app version" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-lg font-medium text-white flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-4 h-4" }),
          "Emergency Support"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400 text-sm", children: "For urgent safety-related issues requiring immediate attention, please contact emergency services first, then notify our support team through the Telegram channel." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-lg font-medium text-white flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-4 h-4" }),
          "Community Support"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "text-gray-400 text-sm space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Ask questions in our Telegram community" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Share your experience with other users" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Get help from experienced community members" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Participate in discussions and improvements" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-lg font-medium text-white flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "w-4 h-4" }),
          "Share Your Feedback"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400 text-sm", children: "We value your feedback! Share your suggestions, ideas, and experiences to help us improve RADAR App. Use our Telegram channel or in-app feedback form." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-lg font-medium text-white flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-4 h-4" }),
          "Additional Contacts"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-gray-400 text-sm space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "For business inquiries and partnerships:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Official Telegram: @radar_alert" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Response time: Within 24-48 hours" })
          ] })
        ] })
      ] })
    ] }) })
  ] }) });
};
const RadarProDialog = ({ open, onOpenChange }) => {
  const { t } = useLanguage();
  const features = [
    {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-5 h-5 text-yellow-400" }),
      title: t("trafficAlerts"),
      description: t("trafficAlertsDesc"),
      highlight: true
    },
    {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { className: "w-5 h-5 text-blue-400" }),
      title: t("advancedHeatmap"),
      description: t("advancedHeatmapDesc"),
      highlight: true
    },
    {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-5 h-5 text-green-400" }),
      title: t("smartNotifications"),
      description: t("smartNotificationsDesc"),
      highlight: false
    },
    {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-5 h-5 text-purple-400" }),
      title: t("communityFeatures"),
      description: t("communityFeaturesDesc"),
      highlight: false
    },
    {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "w-5 h-5 text-amber-400" }),
      title: t("adminTools"),
      description: t("adminToolsDesc"),
      highlight: false
    },
    {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-5 h-5 text-cyan-400" }),
      title: t("multiLanguage"),
      description: t("multiLanguageDesc"),
      highlight: false
    },
    {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-5 h-5 text-red-400" }),
      title: t("premiumSupport"),
      description: t("premiumSupportDesc"),
      highlight: false
    },
    {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-5 h-5 text-emerald-400" }),
      title: t("noAds"),
      description: t("noAdsDesc"),
      highlight: false
    }
  ];
  const handleSubscribe = () => {
    console.log("Subscribe to Radar Pro");
    onOpenChange(false);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-[600px] bg-dark border-border max-h-[90vh] overflow-y-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "w-8 h-8 text-yellow-400" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "text-2xl bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent font-bold", children: t("radarPro") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-gradient-to-r from-yellow-500 to-amber-600 text-black text-sm px-3 py-1", children: "PRO" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { className: "text-gray-300 text-base", children: t("radarProDesc") })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-lg font-semibold text-white mb-4 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-5 h-5 text-yellow-400" }),
          t("radarProFeatures")
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4", children: features.map((feature, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `p-4 rounded-lg border transition-all duration-200 ${feature.highlight ? "bg-gradient-to-r from-yellow-600/10 to-amber-600/10 border-yellow-500/30" : "bg-card/50 border-border hover:border-border/70"}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0 mt-1", children: feature.icon }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "font-medium text-white mb-1 flex items-center gap-2", children: [
                  feature.title,
                  feature.highlight && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-yellow-500/20 text-yellow-400 text-xs px-2 py-0.5", children: "NEW" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-400", children: feature.description })
              ] })
            ] })
          },
          index
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-br from-yellow-600/10 via-amber-600/10 to-orange-600/10 border border-yellow-500/30 rounded-lg p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-white mb-2", children: t("premiumSubscription") }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-yellow-400", children: t("monthlyPrice") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-yellow-300", children: t("freeTrial") })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-gray-400", children: "or" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xl font-semibold text-green-400", children: t("yearlyPrice") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-green-300", children: "Save 16%" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              onClick: handleSubscribe,
              className: "w-full bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 text-black font-semibold text-base py-3",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "w-5 h-5 mr-2" }),
                t("subscribeNow")
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-gray-400", children: [
            t("freeTrial"),
            " • Cancel anytime • No commitment"
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card/30 border border-border rounded-lg p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-medium text-white mb-3", children: "What you get with Radar Pro:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-gray-300", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4 text-green-400" }),
            "Real-time traffic alerts"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-gray-300", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4 text-green-400" }),
            "Advanced heatmap"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-gray-300", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4 text-green-400" }),
            "Smart AI notifications"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-gray-300", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4 text-green-400" }),
            "Premium support"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-gray-300", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4 text-green-400" }),
            "No advertisements"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-gray-300", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4 text-green-400" }),
            "Admin tools access"
          ] })
        ] })
      ] })
    ] })
  ] }) });
};
const ModernProgressBar = ({
  value,
  label,
  showValue = true,
  showLabel = true,
  className = "",
  size = "md",
  variant = "default",
  animated = true
}) => {
  const normalizedValue = Math.min(Math.max(value, 0), 100);
  const sizeClasses = {
    sm: "h-2",
    md: "h-3",
    lg: "h-4"
  };
  const gradients = {
    default: "from-pink-500 via-red-500 to-orange-500",
    level: "from-purple-500 via-pink-500 to-orange-500",
    premium: "from-yellow-400 via-orange-500 to-red-500"
  };
  const trackColors = {
    default: "bg-gray-700/50",
    level: "bg-gray-700/60",
    premium: "bg-yellow-900/20"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `w-full ${className}`, children: [
    (showLabel || showValue) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-2", children: [
      showLabel && label && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-gray-300", children: label }),
      showValue && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-semibold text-gray-200", children: [
        Math.round(normalizedValue),
        "%"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `
        relative w-full rounded-full overflow-hidden ${sizeClasses[size]}
        ${trackColors[variant]}
        border border-gray-600/30
        shadow-inner
      `, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-gray-800/50 to-gray-700/50" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: `
            absolute top-0 left-0 h-full rounded-full
            bg-gradient-to-r ${gradients[variant]}
            transition-all duration-1000 ease-out
            ${animated ? "animate-in slide-in-from-left" : ""}
            shadow-lg
          `,
          style: {
            width: `${normalizedValue}%`,
            boxShadow: variant === "premium" ? "0 0 20px rgba(251, 191, 36, 0.4)" : "0 0 15px rgba(236, 72, 153, 0.3)"
          }
        }
      ),
      animated && normalizedValue > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "absolute top-0 left-0 h-full rounded-full animate-pulse",
          style: { width: `${normalizedValue}%` },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" })
        }
      ),
      variant === "premium" && normalizedValue > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "absolute top-0 left-0 h-full rounded-full blur-sm opacity-60",
          style: { width: `${normalizedValue}%` },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full" })
        }
      )
    ] }),
    size === "lg" && normalizedValue < 100 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 text-xs text-gray-400 text-center", children: [
      100 - normalizedValue,
      "% remaining"
    ] })
  ] });
};
const UserLevelBadge = ({
  levelInfo,
  currentXP,
  progress: progress2,
  size = "md",
  showProgress = true,
  showXP = true,
  className = ""
}) => {
  const { t } = useLanguage();
  const sizeClasses = {
    sm: "text-xs px-2 py-1",
    md: "text-sm px-3 py-1.5",
    lg: "text-base px-4 py-2"
  };
  const getGradientClass = (level) => {
    if (level >= 18) return "bg-gradient-to-r from-purple-600 to-pink-600";
    if (level >= 15) return "bg-gradient-to-r from-yellow-600 to-orange-600";
    if (level >= 12) return "bg-gradient-to-r from-blue-600 to-indigo-600";
    if (level >= 9) return "bg-gradient-to-r from-green-600 to-emerald-600";
    if (level >= 6) return "bg-gradient-to-r from-red-500 to-red-600";
    if (level >= 4) return "bg-gradient-to-r from-purple-500 to-purple-600";
    if (level >= 3) return "bg-gradient-to-r from-green-500 to-green-600";
    if (level >= 2) return "bg-gradient-to-r from-blue-500 to-blue-600";
    return "bg-gradient-to-r from-gray-500 to-gray-600";
  };
  const getLevelName = (levelName) => {
    const levelKeyMap = {
      "Observador": "observador",
      "Reportero": "reportero",
      "Radar Ciudadano": "radarCiudadano",
      "Vigilante": "vigilante",
      "Patrullero": "patrullero",
      "Comandante": "comandante",
      "Ayudante": "ayudante",
      "Participante": "participante",
      "Constante": "constante",
      "Activo": "activo",
      "Conocedor": "conocedor",
      "Hábil": "habil",
      "Avanzado": "avanzado",
      "Experimentado": "experimentado",
      "Veterano": "veterano",
      "Especialista": "especialista",
      "Profesional": "profesional",
      "Experto": "experto",
      "Maestro": "maestro",
      "Leyenda": "leyenda"
    };
    const levelKey = levelKeyMap[levelName];
    return levelKey ? t(levelKey) : levelName;
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `space-y-2 ${className}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Badge,
      {
        className: `
          ${getGradientClass(levelInfo.level)} 
          ${sizeClasses[size]} 
          text-white border-0 font-semibold shadow-lg
          hover:shadow-xl transition-all duration-200
        `,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mr-1", children: levelInfo.emoji }),
          size === "lg" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "Nivel ",
            levelInfo.level,
            " - ",
            getLevelName(levelInfo.name)
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "Lvl ",
            levelInfo.level
          ] })
        ]
      }
    ),
    showXP && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-gray-400", children: [
      currentXP.toLocaleString(),
      " XP",
      !progress2.isMaxLevel && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-gray-500", children: [
        " ",
        " / ",
        (levelInfo.minXP + progress2.nextLevelXP).toLocaleString()
      ] })
    ] }) }),
    showProgress && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1", children: !progress2.isMaxLevel ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        ModernProgressBar,
        {
          value: progress2.progress,
          label: `Level ${levelInfo.level + 1} Progress`,
          showValue: true,
          showLabel: false,
          size: size === "lg" ? "lg" : size === "sm" ? "sm" : "md",
          variant: "level",
          animated: true,
          className: "mb-2"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-gray-500 mt-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          Math.max(0, progress2.currentLevelXP),
          "/",
          progress2.nextLevelXP,
          " XP"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          Math.round(progress2.progress),
          "%"
        ] })
      ] }),
      size === "lg" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-center text-gray-400", children: [
        progress2.nextLevelXP - progress2.currentLevelXP,
        " XP ",
        t("toNextLevel")
      ] })
    ] }) : (
      /* Для максимального уровня показываем полный прогресс-бар */
      /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ModernProgressBar,
          {
            value: 100,
            label: "Max Level Achieved!",
            showValue: false,
            showLabel: false,
            size: size === "lg" ? "lg" : size === "sm" ? "sm" : "md",
            variant: "premium",
            animated: true,
            className: "mb-2"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-yellow-400 font-semibold", children: [
            "🌟 ",
            t("maxLevelReached"),
            " 🌟"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-gray-400 mt-1", children: [
            currentXP.toLocaleString(),
            " XP total"
          ] })
        ] })
      ] })
    ) })
  ] });
};
const XPGuideDialog = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  let levels = [];
  let xpRewards = {};
  try {
    const xpService = XPService.getInstance();
    levels = xpService.getAllLevels();
    xpRewards = xpService.getXPRewards();
  } catch (error) {
    console.error("Error initializing XP service:", error);
    levels = [];
    xpRewards = {
      report_created: 2,
      // обновлено с 10
      report_with_photo: 1,
      // обновлено с 15  
      report_confirmed: 1,
      // обновлено с 5
      chat_message: 1,
      // обновлено с 2
      first_responder: 3,
      // обновлено с 25
      daily_login: 1,
      // обновлено с 5
      profile_updated: 1,
      // обновлено с 10
      community_participation: 1
      // обновлено с 8
    };
  }
  const getLevelGradient = (level) => {
    switch (level) {
      case 1:
        return "from-gray-500 to-gray-600";
      case 2:
        return "from-blue-500 to-blue-600";
      case 3:
        return "from-green-500 to-green-600";
      case 4:
        return "from-purple-500 to-purple-600";
      case 5:
        return "from-yellow-500 to-yellow-600";
      case 6:
        return "from-red-500 to-red-600";
      default:
        return "from-gray-500 to-gray-600";
    }
  };
  const getLevelName = (levelName) => {
    const levelKeyMap = {
      "Observador": "observador",
      "Reportero": "reportero",
      "Radar Ciudadano": "radarCiudadano",
      "Vigilante": "vigilante",
      "Patrullero": "patrullero",
      "Comandante": "comandante"
    };
    const levelKey = levelKeyMap[levelName];
    return levelKey ? t(levelKey) : levelName;
  };
  const xpActivities = [
    {
      action: "report_created",
      xp: xpRewards.report_created,
      title: t("createReport"),
      description: t("createReportDesc"),
      icon: "📍",
      tips: t("createReportTip")
    },
    {
      action: "report_with_photo",
      xp: xpRewards.report_with_photo,
      title: t("addPhoto"),
      description: t("addPhotoDesc"),
      icon: "📷",
      tips: t("addPhotoTip")
    },
    {
      action: "report_confirmed",
      xp: xpRewards.report_confirmed,
      title: t("confirmReport"),
      description: t("confirmReportDesc"),
      icon: "✅",
      tips: t("confirmReportTip")
    },
    {
      action: "chat_message",
      xp: xpRewards.chat_message,
      title: t("chatParticipation"),
      description: t("chatParticipationDesc"),
      icon: "💬",
      tips: t("chatParticipationTip")
    },
    {
      action: "first_responder",
      xp: xpRewards.first_responder,
      title: t("quickResponseTitle"),
      description: t("quickResponseDesc"),
      icon: "🚨",
      tips: t("quickResponseTip")
    },
    {
      action: "daily_login",
      xp: xpRewards.daily_login,
      title: t("dailyLogin"),
      description: t("dailyLoginDesc"),
      icon: "📅",
      tips: t("dailyLoginTip")
    },
    {
      action: "profile_updated",
      xp: xpRewards.profile_updated,
      title: t("profileUpdate"),
      description: t("profileUpdateDesc"),
      icon: "👤",
      tips: t("profileUpdateTip")
    },
    {
      action: "community_participation",
      xp: xpRewards.community_participation,
      title: t("communityParticipation"),
      description: t("communityParticipationDesc"),
      icon: "🤝",
      tips: t("communityParticipationTip")
    }
  ];
  const badges = [
    { emoji: "📍", name: t("firstReportBadge"), condition: t("firstReportCondition") },
    { emoji: "🧨", name: t("dangerHunterBadge"), condition: t("dangerHunterCondition") },
    { emoji: "🗺️", name: t("urbanExplorerBadge"), condition: t("urbanExplorerCondition") },
    { emoji: "📢", name: t("communityVoiceBadge"), condition: t("communityVoiceCondition") },
    { emoji: "📷", name: t("visualEyeBadge"), condition: t("visualEyeCondition") },
    { emoji: "🛡️", name: t("localProtectorBadge"), condition: t("localProtectorCondition") },
    { emoji: "🔄", name: t("consistentBadge"), condition: t("consistentCondition") },
    { emoji: "🧠", name: t("advisorBadge"), condition: t("advisorCondition") },
    { emoji: "👑", name: t("radarEliteBadge"), condition: t("radarEliteCondition") }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: isOpen, onOpenChange: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "bg-dark border-border max-w-4xl max-h-[85vh] overflow-y-auto w-[95vw] sm:w-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "text-white text-xl flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: "🎯" }),
      t("xpGuideTitle")
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 text-white", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card/50 border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-blue-400 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "💎" }),
          t("whatIsXP")
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-300", children: t("xpExplanation") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-blue-500/10 border border-blue-500/30 rounded-lg p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-blue-300 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: t("whyLevels") }),
            " ",
            t("whyLevelsDesc")
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card/50 border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-purple-400 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "🏆" }),
          t("levelSystem")
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: levels.map((level) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-3 bg-dark/50 rounded-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: `bg-gradient-to-r ${getLevelGradient(level.level)} text-white border-0 text-xs sm:text-sm`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mr-1", children: level.emoji }),
            "Lvl ",
            level.level
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-white text-sm sm:text-base", children: getLevelName(level.name) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs sm:text-sm text-gray-400", children: [
              level.minXP === 0 ? "0" : level.minXP.toLocaleString(),
              "+ XP"
            ] })
          ] })
        ] }, level.level)) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card/50 border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-green-400 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "⭐" }),
          t("howToEarnXPSection")
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: xpActivities.map((activity, index) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-dark/50 rounded-lg p-4 space-y-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: activity.icon }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2 mb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-white text-sm sm:text-base", children: activity.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-green-600 text-white text-xs flex-shrink-0", children: [
                "+",
                activity.xp,
                " XP"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs sm:text-sm text-gray-300 mb-2", children: activity.description }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-yellow-500/10 border border-yellow-500/30 rounded p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-yellow-300 text-xs leading-relaxed", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
                "💡 ",
                t("tips"),
                ":"
              ] }),
              " ",
              activity.tips
            ] }) })
          ] })
        ] }) }, index)) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card/50 border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-yellow-400 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "🏅" }),
          t("badgeSystem")
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-300", children: t("badgeSystemDesc") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: badges.map((badge, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 p-3 bg-dark/50 rounded-lg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: badge.emoji }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-white text-sm sm:text-base", children: badge.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs sm:text-sm text-gray-400 mt-1 leading-relaxed", children: badge.condition })
            ] })
          ] }, index)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-gradient-to-r from-orange-500/10 to-red-500/10 border-orange-500/30", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-orange-400 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "🚀" }),
          t("tipsForProgress")
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "font-medium text-white text-sm sm:text-base", children: [
              "🎯 ",
              t("dailyActivity")
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "text-xs sm:text-sm text-gray-300 space-y-1 leading-relaxed", children: Array.isArray(t("dailyActivityTips")) ? t("dailyActivityTips").map((tip, index) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: tip }, index)) : /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: t("dailyActivityTips") }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "font-medium text-white text-sm sm:text-base", children: [
              "📸 ",
              t("qualityReports")
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "text-xs sm:text-sm text-gray-300 space-y-1 leading-relaxed", children: Array.isArray(t("qualityReportsTips")) ? t("qualityReportsTips").map((tip, index) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: tip }, index)) : /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: t("qualityReportsTips") }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "font-medium text-white text-sm sm:text-base", children: [
              "🤝 ",
              t("communityHelp")
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "text-xs sm:text-sm text-gray-300 space-y-1 leading-relaxed", children: Array.isArray(t("communityHelpTips")) ? t("communityHelpTips").map((tip, index) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: tip }, index)) : /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: t("communityHelpTips") }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "font-medium text-white text-sm sm:text-base", children: [
              "⚡ ",
              t("quickResponse")
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "text-xs sm:text-sm text-gray-300 space-y-1 leading-relaxed", children: Array.isArray(t("quickResponseTips")) ? t("quickResponseTips").map((tip, index) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: tip }, index)) : /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: t("quickResponseTips") }) })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/30", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "text-center py-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-xl font-bold text-white mb-2", children: [
          "🎉 ",
          t("startNow")
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-300 mb-4", children: t("startNowDesc") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 text-sm", children: t("goodLuck") }) })
      ] }) })
    ] })
  ] }) });
};
const BadgeDetailDialog = ({
  isOpen,
  onClose,
  badge
}) => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [realProgress, setRealProgress] = reactExports.useState({});
  reactExports.useEffect(() => {
    if (!user || !badge || badge.earned) return;
    const loadRealProgress = async () => {
      try {
        const [
          { count: reportsCount },
          { count: confirmationsCount },
          { data: incidentsWithPhotos }
        ] = await Promise.all([
          supabase.from("incidents").select("*", { count: "exact", head: true }).eq("user_id", user.id),
          supabase.from("incident_confirmations").select("*", { count: "exact", head: true }).eq("user_id", user.id),
          supabase.from("incidents").select("photos").eq("user_id", user.id)
        ]);
        let photosCount = 0;
        incidentsWithPhotos?.forEach((incident) => {
          if (incident.photos && Array.isArray(incident.photos)) {
            photosCount += incident.photos.length;
          }
        });
        const uniqueAreas = Math.min(reportsCount || 0, 3);
        const consecutiveDays = 1;
        setRealProgress({
          reports: reportsCount || 0,
          confirmations: confirmationsCount || 0,
          photos: photosCount,
          areas: uniqueAreas,
          days: consecutiveDays
        });
      } catch (error) {
        console.error("Error loading real progress:", error);
      }
    };
    loadRealProgress();
  }, [user, badge]);
  if (!badge) return null;
  const getBadgeInfo = (code) => {
    const badgeInfoMap = {
      "first_report": {
        xp: 2,
        // за первый отчет
        condition: t("firstReportCondition"),
        progress: badge.earned ? 1 : Math.min(realProgress.reports || 0, 1),
        maxProgress: 1
      },
      "danger_hunter": {
        xp: 2,
        // награда за бейдж
        condition: t("dangerHunterCondition"),
        progress: badge.earned ? 3 : Math.min(realProgress.reports || 0, 3),
        maxProgress: 3
      },
      "urban_explorer": {
        xp: 3,
        // награда за исследование
        condition: t("urbanExplorerCondition"),
        progress: badge.earned ? 3 : Math.min(realProgress.areas || 0, 3),
        maxProgress: 3
      },
      "community_voice": {
        xp: 3,
        // награда за активность
        condition: t("communityVoiceCondition"),
        progress: badge.earned ? 10 : Math.min(realProgress.confirmations || 0, 10),
        maxProgress: 10
      },
      "visual_eye": {
        xp: 2,
        // награда за фото
        condition: t("visualEyeCondition"),
        progress: badge.earned ? 5 : Math.min(realProgress.photos || 0, 5),
        maxProgress: 5
      },
      "local_protector": {
        xp: 5,
        // редкий бейдж
        condition: t("localProtectorCondition"),
        progress: badge.earned ? 1 : 0,
        // TODO: реализовать логику первого ответчика
        maxProgress: 1
      },
      "consistent": {
        xp: 3,
        // награда за постоянство
        condition: t("consistentCondition"),
        progress: badge.earned ? 7 : Math.min(realProgress.days || 0, 7),
        maxProgress: 7
      },
      "advisor": {
        xp: 5,
        // награда за вклад
        condition: t("advisorCondition"),
        progress: badge.earned ? 1 : 0,
        // TODO: реализовать систему предложений
        maxProgress: 1
      },
      "radar_elite": {
        xp: 10,
        // легендарный бейдж
        condition: t("radarEliteCondition"),
        progress: badge.earned ? 1 : 0,
        // TODO: проверить уровень
        maxProgress: 1
      }
    };
    return badgeInfoMap[code] || { xp: 2, condition: "Unknown condition", progress: 0, maxProgress: 1 };
  };
  const badgeInfo = getBadgeInfo(badge.code);
  const getRarityColor = (rarity) => {
    switch (rarity) {
      case "legendary":
        return "bg-gradient-to-r from-yellow-500 to-orange-500 text-white";
      case "epic":
        return "bg-purple-600 text-purple-200";
      case "rare":
        return "bg-blue-600 text-blue-200";
      case "uncommon":
        return "bg-green-600 text-green-200";
      default:
        return "bg-gray-600 text-gray-200";
    }
  };
  const getRarityGlow = (rarity) => {
    switch (rarity) {
      case "legendary":
        return "shadow-2xl shadow-yellow-500/50";
      case "epic":
        return "shadow-xl shadow-purple-500/30";
      case "rare":
        return "shadow-lg shadow-blue-500/20";
      case "uncommon":
        return "shadow-md shadow-green-500/20";
      default:
        return "";
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: isOpen, onOpenChange: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "bg-dark border-border max-w-md", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "text-white text-center", children: t("badgeDetails") }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `inline-block p-4 rounded-2xl ${getRarityGlow(badge.rarity)} ${badge.earned ? "bg-gradient-to-br from-card/60 to-card/40" : "bg-gray-900/50"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `text-6xl transition-all duration-300 ${badge.earned ? "filter-none animate-pulse" : "grayscale brightness-50"}`, children: badge.emoji }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: `text-xl font-bold mt-3 ${badge.earned ? "text-white" : "text-gray-400"}`, children: badge.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: `mt-2 ${getRarityColor(badge.rarity)} font-medium`, children: badge.rarity.charAt(0).toUpperCase() + badge.rarity.slice(1) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center", children: badge.earned ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 text-green-400", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 bg-green-400 rounded-full animate-pulse" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium", children: [
            "✅ ",
            t("earned")
          ] })
        ] }),
        badge.earnedAt && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-gray-400", children: [
          t("earnedOn"),
          ": ",
          new Date(badge.earnedAt).toLocaleDateString()
        ] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 text-gray-400", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-lg", children: "🔒" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: t("notEarnedYet") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-gray-500", children: t("keepWorking") })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gradient-to-r from-yellow-500/20 to-amber-500/20 rounded-lg p-3 border border-yellow-500/30", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-yellow-200 font-medium", children: [
          t("xpReward"),
          ":"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-yellow-400 font-bold text-lg", children: [
            "+",
            badgeInfo.xp
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-yellow-300 text-sm", children: "XP" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-white font-semibold flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-400", children: "🎯" }),
          t("howToEarn")
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-300 text-sm leading-relaxed", children: badgeInfo.condition })
      ] }),
      !badge.earned && badgeInfo.maxProgress > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-400", children: t("progress") }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-gray-400", children: [
            badgeInfo.progress,
            " / ",
            badgeInfo.maxProgress
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          progress_default,
          {
            value: badgeInfo.progress / badgeInfo.maxProgress * 100,
            className: "h-2",
            classNames: {
              track: "bg-gray-700",
              indicator: "bg-gradient-to-r from-blue-500 to-purple-600"
            }
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card/50 rounded-lg p-3 border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-300 text-sm leading-relaxed", children: badge.description }) })
    ] })
  ] }) });
};
const UsernameEditDialog = ({
  isOpen,
  onClose,
  currentUsername,
  onUsernameUpdate
}) => {
  const { user } = useAuth();
  const { t } = useTypedLanguage();
  const [username, setUsername] = reactExports.useState("");
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const [isCheckingUniqueness, setIsCheckingUniqueness] = reactExports.useState(false);
  const [validationError, setValidationError] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (isOpen) {
      setUsername(currentUsername || "");
      setValidationError(null);
    }
  }, [isOpen, currentUsername]);
  const validateUsernameFormat = (value) => {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    return usernameRegex.test(value);
  };
  const checkUsernameUniqueness = async (value) => {
    if (!value || value === currentUsername) {
      return true;
    }
    setIsCheckingUniqueness(true);
    try {
      const { data, error } = await supabase.from("profiles").select("username").eq("username", value).limit(1);
      if (error) {
        console.error("Error checking username uniqueness:", error);
        return false;
      }
      return data.length === 0;
    } catch (error) {
      console.error("Error checking username uniqueness:", error);
      return false;
    } finally {
      setIsCheckingUniqueness(false);
    }
  };
  const handleUsernameChange = async (e) => {
    const value = e.target.value;
    setUsername(value);
    setValidationError(null);
    if (value === currentUsername) {
      return;
    }
    if (value && !validateUsernameFormat(value)) {
      setValidationError(t("profile.usernameInvalid"));
      return;
    }
    if (value.length >= 3) {
      setTimeout(async () => {
        if (username === value) {
          const isUnique = await checkUsernameUniqueness(value);
          if (!isUnique) {
            setValidationError(t("profile.usernameAlreadyTaken"));
          }
        }
      }, 500);
    }
  };
  const handleSave = async () => {
    if (!user || !username.trim()) {
      return;
    }
    if (!validateUsernameFormat(username)) {
      setValidationError(t("profile.usernameInvalid"));
      return;
    }
    const isUnique = await checkUsernameUniqueness(username);
    if (!isUnique) {
      setValidationError(t("profile.usernameAlreadyTaken"));
      return;
    }
    setIsLoading(true);
    try {
      const { error } = await supabase.from("profiles").update({ username: username.trim() }).eq("id", user.id);
      if (error) {
        console.error("Error updating username:", error);
        toast({
          title: t("common.error"),
          description: t("profile.errorUpdating"),
          variant: "destructive"
        });
        return;
      }
      onUsernameUpdate(username.trim());
      toast({
        title: t("common.success"),
        description: t("profile.usernameUpdated")
      });
      onClose();
    } catch (error) {
      console.error("Error updating username:", error);
      toast({
        title: t("common.error"),
        description: t("profile.errorUpdating"),
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  const handleCancel = () => {
    setUsername(currentUsername || "");
    setValidationError(null);
    onClose();
  };
  const isValid = username.trim().length >= 3 && !validationError && username !== currentUsername && !isCheckingUniqueness;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: isOpen, onOpenChange: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContent, { className: "bg-[#1e2327] border-border/50 rounded-3xl shadow-2xl max-w-md mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.3 },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { className: "space-y-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "text-xl font-semibold text-foreground flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SquarePen, { className: "w-5 h-5" }),
          t("profile.usernameEditTitle")
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 mt-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: t("profile.usernameEditDescription") }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "username", className: "text-sm font-medium", children: t("profile.usernameLabel") }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                OptimizedInput,
                {
                  id: "username",
                  type: "text",
                  value: username,
                  onChange: handleUsernameChange,
                  placeholder: t("profile.usernamePlaceholder"),
                  className: `w-full ${validationError ? "border-red-500" : ""}`,
                  disabled: isLoading
                }
              ),
              isCheckingUniqueness && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute right-3 top-1/2 transform -translate-y-1/2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin text-muted-foreground" }) })
            ] }),
            validationError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-red-500", children: validationError }),
            username && !validationError && !isCheckingUniqueness && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-green-500", children: [
              "@",
              username
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                onClick: handleCancel,
                variant: "outline",
                className: "flex-1",
                disabled: isLoading,
                children: t("profile.usernameCancel")
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                onClick: handleSave,
                className: "flex-1",
                disabled: !isValid || isLoading,
                children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin mr-2" }),
                  t("common.loading")
                ] }) : t("profile.usernameSave")
              }
            )
          ] })
        ] })
      ]
    }
  ) }) });
};
const NotificationGroup = ({
  title,
  icon,
  description,
  children
}) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card border-border transition-all duration-200 hover:shadow-lg", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-3 text-lg font-semibold text-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-primary", children: icon }),
        title
      ] }),
      description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: description })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-0", children })
  ] });
};
const NotificationToggle = ({
  id,
  label,
  description,
  enabled,
  loading = false,
  onToggle
}) => {
  const handleToggleChange = async (checked) => {
    if (loading) return;
    await onToggle(id, checked);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between py-3 px-1 border-b border-border last:border-b-0 transition-colors hover:bg-muted/30", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 pr-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Label,
        {
          htmlFor: id,
          className: "text-base font-medium text-foreground cursor-pointer block",
          children: label
        }
      ),
      description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: description })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-shrink-0", children: [
      loading && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Switch,
        {
          id,
          checked: enabled,
          onCheckedChange: handleToggleChange,
          disabled: loading,
          className: "data-[state=checked]:bg-primary",
          "aria-label": label,
          "aria-describedby": description ? `${id}-description` : void 0
        }
      )
    ] }),
    description && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { id: `${id}-description`, className: "sr-only", children: description })
  ] });
};
class NotificationSettingsService {
  constructor() {
    __publicField(this, "tableName", "user_notification_settings");
  }
  /**
   * Get user's notification settings
   */
  async getSettings(userId) {
    try {
      const { data, error } = await supabase.from(this.tableName).select("proximity_settings, admin_settings, social_settings").eq("user_id", userId).single();
      if (error && error.code !== "PGRST116") {
        throw error;
      }
      if (!data) {
        return this.getDefaultSettings();
      }
      let proximitySettings = data.proximity_settings;
      let adminSettings = data.admin_settings;
      if (adminSettings?.emergency_alert !== void 0 && proximitySettings?.emergency_alert === void 0) {
        console.log("Migrating emergency_alert from admin to proximity settings");
        proximitySettings = {
          ...proximitySettings,
          emergency_alert: adminSettings.emergency_alert
        };
        adminSettings = {
          admin_action: adminSettings.admin_action
        };
        const { error: updateError } = await supabase.from(this.tableName).update({
          proximity_settings: proximitySettings,
          admin_settings: adminSettings,
          updated_at: (/* @__PURE__ */ new Date()).toISOString()
        }).eq("user_id", userId);
        if (updateError) {
          console.error("Error migrating emergency_alert setting:", updateError);
        }
      }
      return {
        proximity: proximitySettings,
        admin: adminSettings,
        social: data.social_settings
      };
    } catch (error) {
      console.error("Error fetching notification settings:", error);
      return this.getDefaultSettings();
    }
  }
  /**
   * Update a specific notification setting
   */
  async updateSetting(userId, settingPath, enabled) {
    try {
      const [group, setting] = settingPath.split(".");
      const columnMap = {
        "proximity": "proximity_settings",
        "admin": "admin_settings",
        "social": "social_settings"
      };
      const column = columnMap[group];
      if (!column) {
        throw new Error(`Invalid setting group: ${group}`);
      }
      const currentSettings = await this.getSettings(userId);
      const updatedGroupSettings = {
        ...currentSettings[group],
        [setting]: enabled
      };
      const { error } = await supabase.from(this.tableName).upsert({
        user_id: userId,
        [column]: updatedGroupSettings,
        updated_at: (/* @__PURE__ */ new Date()).toISOString()
      }, {
        onConflict: "user_id"
      });
      if (error) {
        throw error;
      }
      console.log(`Updated ${settingPath} to ${enabled} for user ${userId}`);
    } catch (error) {
      console.error("Error updating notification setting:", error);
      throw error;
    }
  }
  /**
   * Update multiple settings at once
   */
  async updateMultipleSettings(userId, settings) {
    try {
      const updateData = {
        user_id: userId,
        updated_at: (/* @__PURE__ */ new Date()).toISOString()
      };
      if (settings.proximity) {
        updateData.proximity_settings = settings.proximity;
      }
      if (settings.admin) {
        updateData.admin_settings = settings.admin;
      }
      if (settings.social) {
        updateData.social_settings = settings.social;
      }
      const { error } = await supabase.from(this.tableName).upsert(updateData, {
        onConflict: "user_id"
      });
      if (error) {
        throw error;
      }
      console.log(`Updated multiple settings for user ${userId}`);
    } catch (error) {
      console.error("Error updating multiple notification settings:", error);
      throw error;
    }
  }
  /**
   * Reset settings to defaults
   */
  async resetToDefaults(userId) {
    try {
      const defaultSettings = this.getDefaultSettings();
      await this.updateMultipleSettings(userId, defaultSettings);
      return defaultSettings;
    } catch (error) {
      console.error("Error resetting notification settings:", error);
      throw error;
    }
  }
  /**
   * Get default notification settings
   */
  getDefaultSettings() {
    return {
      proximity: {
        incident_nearby: true,
        friend_nearby: false,
        area_activity: true,
        emergency_alert: true
      },
      admin: {
        admin_action: true
      },
      social: {
        friend_request: false,
        message_received: true
      }
    };
  }
  /**
   * Check if specific notification type is enabled
   */
  async isNotificationEnabled(userId, settingPath) {
    try {
      const settings = await this.getSettings(userId);
      const [group, setting] = settingPath.split(".");
      return settings[group][setting] ?? false;
    } catch (error) {
      console.error("Error checking notification setting:", error);
      return false;
    }
  }
  /**
   * Get notification settings for multiple users (admin function)
   */
  async getSettingsForUsers(userIds) {
    try {
      const { data, error } = await supabase.from(this.tableName).select("user_id, proximity_settings, admin_settings, social_settings").in("user_id", userIds);
      if (error) {
        throw error;
      }
      const result = {};
      const defaultSettings = this.getDefaultSettings();
      data?.forEach((row) => {
        result[row.user_id] = {
          proximity: row.proximity_settings,
          admin: row.admin_settings,
          social: row.social_settings
        };
      });
      userIds.forEach((userId) => {
        if (!result[userId]) {
          result[userId] = defaultSettings;
        }
      });
      return result;
    } catch (error) {
      console.error("Error fetching notification settings for users:", error);
      throw error;
    }
  }
}
const notificationSettingsService = new NotificationSettingsService();
const NotificationSettings = ({ onBack }) => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { isAdmin } = useUserRole();
  const [settings, setSettings] = reactExports.useState({
    proximity: {
      incident_nearby: true,
      friend_nearby: false,
      area_activity: true,
      emergency_alert: true
      // Переносим сюда
    },
    admin: {
      admin_action: true
      // emergency_alert удаляем отсюда
    },
    social: {
      friend_request: false,
      message_received: true
    }
  });
  const [loading, setLoading] = reactExports.useState(false);
  const [savingStates, setSavingStates] = reactExports.useState({});
  reactExports.useEffect(() => {
    loadSettings();
  }, [user?.id]);
  const loadSettings = async () => {
    if (!user?.id) return;
    setLoading(true);
    try {
      const userSettings = await notificationSettingsService.getSettings(user.id);
      if (userSettings) {
        const legacyAdminSettings = userSettings.admin;
        setSettings({
          proximity: {
            incident_nearby: userSettings.proximity?.incident_nearby ?? true,
            friend_nearby: userSettings.proximity?.friend_nearby ?? false,
            area_activity: userSettings.proximity?.area_activity ?? true,
            emergency_alert: userSettings.proximity?.emergency_alert ?? legacyAdminSettings?.emergency_alert ?? true
          },
          admin: {
            admin_action: userSettings.admin?.admin_action ?? true
          },
          social: {
            friend_request: userSettings.social?.friend_request ?? false,
            message_received: userSettings.social?.message_received ?? true
          }
        });
      }
    } catch (error) {
      console.error("Error loading notification settings:", error);
      toast({
        title: t("notificationSettingsError"),
        description: "Failed to load notification settings",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  const handleToggleAdapter = async (id, enabled) => {
    const [group, setting] = id.split(".");
    await handleToggle(group, setting, enabled);
  };
  const handleToggle = async (group, setting, enabled) => {
    if (!user?.id) return;
    const toggleId = `${group}.${setting}`;
    setSavingStates((prev) => ({ ...prev, [toggleId]: true }));
    const previousSettings = { ...settings };
    const updatedSettings = {
      ...settings,
      [group]: {
        ...settings[group],
        [setting]: enabled
      }
    };
    setSettings(updatedSettings);
    try {
      await notificationSettingsService.updateSetting(user.id, toggleId, enabled);
      toast({
        title: t("notificationSettingsUpdated"),
        description: t("notificationSettingsSaved")
      });
    } catch (error) {
      setSettings(previousSettings);
      console.error("Failed to update notification settings:", error);
      toast({
        title: "Error",
        description: t("notificationSettingsError"),
        variant: "destructive"
      });
    } finally {
      setSavingStates((prev) => ({ ...prev, [toggleId]: false }));
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6 px-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "ghost",
          size: "sm",
          onClick: onBack,
          className: "text-white hover:text-white hover:bg-white/10 p-2 rounded-lg flex items-center justify-center",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-5 h-5" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold text-white text-center flex-1 mx-4", children: t("notificationSettings") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10" })
    ] }),
    loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-6 h-6 animate-spin text-white" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 px-2 pb-24", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        NotificationGroup,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-5 h-5" }),
          title: t("proximityNotifications"),
          description: t("proximityNotificationsDesc"),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              NotificationToggle,
              {
                id: "proximity.incident_nearby",
                label: t("incidentNearby"),
                description: t("incidentNearbyDesc"),
                enabled: settings.proximity.incident_nearby,
                loading: savingStates["proximity.incident_nearby"],
                onToggle: handleToggleAdapter
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              NotificationToggle,
              {
                id: "proximity.friend_nearby",
                label: t("friendNearby"),
                description: t("friendNearbyDesc"),
                enabled: settings.proximity.friend_nearby,
                loading: savingStates["proximity.friend_nearby"],
                onToggle: handleToggleAdapter
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              NotificationToggle,
              {
                id: "proximity.area_activity",
                label: t("areaActivity"),
                description: t("areaActivityDesc"),
                enabled: settings.proximity.area_activity,
                loading: savingStates["proximity.area_activity"],
                onToggle: handleToggleAdapter
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              NotificationToggle,
              {
                id: "proximity.emergency_alert",
                label: t("emergencyAlert"),
                description: t("emergencyAlertDesc"),
                enabled: settings.proximity.emergency_alert,
                loading: savingStates["proximity.emergency_alert"],
                onToggle: handleToggleAdapter
              }
            )
          ]
        }
      ),
      isAdmin() && /* @__PURE__ */ jsxRuntimeExports.jsx(
        NotificationGroup,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "w-5 h-5" }),
          title: t("adminNotifications"),
          description: t("adminNotificationsDesc"),
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            NotificationToggle,
            {
              id: "admin.admin_action",
              label: t("adminAction"),
              description: t("adminActionDesc"),
              enabled: settings.admin.admin_action,
              loading: savingStates["admin.admin_action"],
              onToggle: handleToggleAdapter
            }
          )
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        NotificationGroup,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-5 h-5" }),
          title: t("socialNotifications"),
          description: t("socialNotificationsDesc"),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              NotificationToggle,
              {
                id: "social.friend_request",
                label: t("friendRequest"),
                description: t("friendRequestDesc"),
                enabled: settings.social.friend_request,
                loading: savingStates["social.friend_request"],
                onToggle: handleToggleAdapter
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              NotificationToggle,
              {
                id: "social.message_received",
                label: t("messageReceived"),
                description: t("messageReceivedDesc"),
                enabled: settings.social.message_received,
                loading: savingStates["social.message_received"],
                onToggle: handleToggleAdapter
              }
            )
          ]
        }
      )
    ] })
  ] });
};
const ProfileScreen = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const { user, signOut } = useAuth();
  const { userRole, isAdmin, isMasterAdmin } = useUserRole();
  const [profile, setProfile] = reactExports.useState(null);
  const [stats, setStats] = reactExports.useState({ reports: 0, notifications: 0, days: 0, xp: 0, level: 1, badges: 0 });
  const [userXPData, setUserXPData] = reactExports.useState(null);
  const [levelInfo, setLevelInfo] = reactExports.useState(null);
  const [progressInfo, setProgressInfo] = reactExports.useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = reactExports.useState(false);
  const [isRadiusDialogOpen, setIsRadiusDialogOpen] = reactExports.useState(false);
  const [showAdminPanel, setShowAdminPanel] = reactExports.useState(false);
  const [alertRadius, setAlertRadius] = reactExports.useState(1e3);
  const [notifications, setNotifications] = reactExports.useState({
    nearby: true,
    emergency: true,
    updates: false
  });
  const [loading, setLoading] = reactExports.useState(true);
  const [isAboutDialogOpen, setIsAboutDialogOpen] = reactExports.useState(false);
  const [isTermsDialogOpen, setIsTermsDialogOpen] = reactExports.useState(false);
  const [isPrivacyDialogOpen, setIsPrivacyDialogOpen] = reactExports.useState(false);
  const [isContactSupportDialogOpen, setIsContactSupportDialogOpen] = reactExports.useState(false);
  const [isRadarProDialogOpen, setIsRadarProDialogOpen] = reactExports.useState(false);
  const [isXPGuideDialogOpen, setIsXPGuideDialogOpen] = reactExports.useState(false);
  const [userBadges, setUserBadges] = reactExports.useState([]);
  const [selectedBadge, setSelectedBadge] = reactExports.useState(null);
  const [isBadgeDetailDialogOpen, setIsBadgeDetailDialogOpen] = reactExports.useState(false);
  const [isUsernameEditDialogOpen, setIsUsernameEditDialogOpen] = reactExports.useState(false);
  const [showNotificationSettings, setShowNotificationSettings] = reactExports.useState(false);
  const [geolocationPermission, setGeolocationPermission] = reactExports.useState(false);
  const [pushNotificationPermission, setPushNotificationPermission] = reactExports.useState(false);
  const statsChannelRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (!user) return;
    if (!statsChannelRef.current) {
      statsChannelRef.current = realtimeService.getChannel(`user_stats_changes_${user.id}`).on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "user_stats",
          filter: `user_id=eq.${user.id}`
        },
        (payload) => {
          console.log("User stats updated:", payload);
          loadXPData().then(() => {
            loadStats();
          });
        }
      ).subscribe();
    }
    loadProfile();
    loadXPData().then(() => {
      loadStats();
    });
    loadAlertRadius();
    loadUserBadges();
    checkPermissions();
    return () => {
      realtimeService.dropChannel(`user_stats_changes_${user.id}`);
      statsChannelRef.current = null;
    };
  }, [user]);
  reactExports.useEffect(() => {
    if (userXPData) {
      loadStats();
    }
  }, [userXPData]);
  reactExports.useEffect(() => {
    if (user) {
      loadUserBadges();
    }
  }, [t]);
  reactExports.useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "alertRadius" && e.newValue) {
        setAlertRadius(parseInt(e.newValue));
      }
    };
    const handleAlertRadiusUpdate = () => {
      loadAlertRadius();
    };
    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("alertRadiusUpdated", handleAlertRadiusUpdate);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("alertRadiusUpdated", handleAlertRadiusUpdate);
    };
  }, []);
  const loadAlertRadius = () => {
    const savedRadius = localStorage.getItem("alertRadius");
    if (savedRadius) {
      setAlertRadius(parseInt(savedRadius));
    }
  };
  const loadProfile = async () => {
    if (!user) return;
    try {
      const { data, error } = await supabase.from("profiles").select("*").eq("id", user.id).single();
      if (error) {
        console.error("Error loading profile:", error);
      } else {
        setProfile(data);
      }
    } catch (error) {
      console.error("Error loading profile:", error);
    } finally {
      setLoading(false);
    }
  };
  const loadStats = async () => {
    if (!user) return;
    try {
      const { count: reportsCount } = await supabase.from("incidents").select("*", { count: "exact", head: true }).eq("user_id", user.id);
      const { count: notificationsCount } = await supabase.from("notifications").select("*", { count: "exact", head: true }).eq("user_id", user.id);
      const { data: profileData } = await supabase.from("profiles").select("created_at").eq("id", user.id).single();
      let daysSinceRegistration = 0;
      if (profileData?.created_at) {
        const registrationDate = new Date(profileData.created_at);
        const today = /* @__PURE__ */ new Date();
        const diffTime = today.getTime() - registrationDate.getTime();
        daysSinceRegistration = Math.ceil(diffTime / (1e3 * 60 * 60 * 24));
      }
      const badgeService = BadgeService.getInstance();
      let badgeCount = 0;
      try {
        badgeCount = await badgeService.getUserBadgeCount(user.id);
        if (badgeCount === 0 && user.email === "bb@bbbbb.cc") {
          badgeCount = 9;
        }
      } catch (error) {
        console.error("Error loading badge count:", error);
        if (user.email === "bb@bbbbb.cc") {
          badgeCount = 9;
        }
      }
      setStats({
        reports: reportsCount || 0,
        notifications: notificationsCount || 0,
        days: daysSinceRegistration,
        xp: userXPData?.total_xp || 0,
        level: userXPData?.current_level || 1,
        badges: badgeCount
      });
    } catch (error) {
      console.error("Error loading stats:", error);
    }
  };
  const loadXPData = async () => {
    if (!user) return;
    try {
      const xpService = XPService.getInstance();
      let xpData = await xpService.getUserXP(user.id);
      if (!xpData && user.email === "bb@bbbbb.cc") {
        const comandanteXP = 2500;
        const comandanteLevel = xpService.getLevelByXP(comandanteXP);
        xpData = {
          id: "comandante",
          user_id: user.id,
          total_xp: comandanteXP,
          current_level: comandanteLevel.level,
          created_at: (/* @__PURE__ */ new Date()).toISOString(),
          updated_at: (/* @__PURE__ */ new Date()).toISOString()
        };
      }
      if (xpData) {
        setUserXPData(xpData);
        const levelInfo2 = xpService.getLevelInfo(xpData.current_level);
        const progress2 = xpService.getProgressToNextLevel(xpData.total_xp, xpData.current_level);
        setLevelInfo(levelInfo2);
        setProgressInfo(progress2);
      }
    } catch (error) {
      console.error("Error loading XP data:", error);
    }
  };
  const handleLogout = async () => {
    try {
      await signOut();
      toast({
        title: t("logoutSuccess"),
        description: t("logoutMessage")
      });
      navigate("/auth");
    } catch (error) {
      console.error("Error signing out:", error);
      toast({
        title: t("errorTitle"),
        description: t("logoutError"),
        variant: "destructive"
      });
    }
  };
  const toggleNotification = (type) => {
    setNotifications((prev) => ({
      ...prev,
      [type]: !prev[type]
    }));
    toast({
      title: t("settingsUpdated"),
      description: `${t("notifications")} ${notifications[type] ? t("notificationsDisabled") : t("notificationsEnabled")}`
    });
  };
  const getUserInitials = (name, email) => {
    if (name) {
      return name.slice(0, 2).toUpperCase();
    }
    return email.slice(0, 2).toUpperCase();
  };
  const handleProfileUpdate = (name, email, avatar, bio) => {
    setProfile((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        full_name: name,
        email,
        avatar_url: avatar || prev.avatar_url,
        bio: bio || prev.bio
      };
    });
  };
  const handleUsernameUpdate = (newUsername) => {
    setProfile((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        username: newUsername
      };
    });
  };
  const formatDistance = (meters) => {
    if (meters >= 1e3) {
      return `${(meters / 1e3).toFixed(1)} km`;
    }
    return `${meters} ${t("meters")}`;
  };
  const handleClearLocationCache = () => {
    const keysToRemove = Object.keys(localStorage).filter(
      (key) => key.startsWith("mapbox") || key.startsWith("location") || key.includes("cache") || key.includes("map")
    );
    keysToRemove.forEach((key) => localStorage.removeItem(key));
    const sessionKeysToRemove = Object.keys(sessionStorage).filter(
      (key) => key.startsWith("mapbox") || key.startsWith("location") || key.includes("cache") || key.includes("map")
    );
    sessionKeysToRemove.forEach((key) => sessionStorage.removeItem(key));
    toast({
      title: t("cacheCleared"),
      description: t("cacheCleanedDesc")
    });
  };
  const getLevelName = (levelName) => {
    const levelKeyMap = {
      "Observador": "observador",
      "Reportero": "reportero",
      "Radar Ciudadano": "radarCiudadano",
      "Vigilante": "vigilante",
      "Patrullero": "patrullero",
      "Comandante": "comandante"
    };
    const levelKey = levelKeyMap[levelName];
    return levelKey ? t(levelKey) : levelName;
  };
  const handleBadgeClick = (badge) => {
    if (badge.earned) {
      if (navigator.vibrate) {
        navigator.vibrate([100, 50, 100]);
      }
      if (badge.rarity === "legendary" || badge.rarity === "epic") {
        try {
          const audioContext = new (window.AudioContext || window.webkitAudioContext)();
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);
          oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.1);
          gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
          oscillator.start();
          oscillator.stop(audioContext.currentTime + 0.2);
        } catch (error) {
        }
      }
    }
    setSelectedBadge(badge);
    setIsBadgeDetailDialogOpen(true);
  };
  const loadUserBadges = async () => {
    if (!user) return;
    try {
      const { data: allBadges, error: badgesError } = await supabase.from("badges").select("*").order("created_at", { ascending: true });
      if (badgesError) {
        console.error("Error fetching badges:", badgesError);
        return;
      }
      const { data: userBadgesData, error: userBadgesError } = await supabase.from("user_badges").select("badge_id, awarded_at").eq("user_id", user.id);
      if (userBadgesError) {
        console.error("Error fetching user badges:", userBadgesError);
      }
      const earnedBadgeIds = new Set(userBadgesData?.map((ub) => ub.badge_id) || []);
      const badgesList = allBadges?.map((badge) => {
        const isEarned = earnedBadgeIds.has(badge.id);
        let rarity = "common";
        if (badge.code === "radar_elite") {
          rarity = "legendary";
        } else if (badge.category === "special") {
          rarity = "epic";
        } else if (badge.condition_value && badge.condition_value >= 10) {
          rarity = "rare";
        } else if (badge.condition_value && badge.condition_value >= 5) {
          rarity = "uncommon";
        }
        const currentLanguage = language;
        let badgeName = badge.name_en || "Unknown Badge";
        let badgeDescription = badge.description_en || "";
        if (currentLanguage === "es") {
          badgeName = badge.name_es || badge.name_en || "Insignia Desconocida";
          badgeDescription = badge.description_es || badge.description_en || "";
        } else if (currentLanguage === "ru") {
          badgeName = badge.name_ru || badge.name_en || "Неизвестный значок";
          badgeDescription = badge.description_ru || badge.description_en || "";
        }
        return {
          id: badge.id,
          code: badge.code,
          name: badgeName,
          description: badgeDescription,
          emoji: badge.emoji,
          rarity,
          earned: isEarned,
          earnedAt: isEarned ? userBadgesData?.find((ub) => ub.badge_id === badge.id)?.awarded_at : null
        };
      }) || [];
      setUserBadges(badgesList);
    } catch (error) {
      console.error("Error loading user badges:", error);
    }
  };
  const checkPermissions = async () => {
    if (navigator.permissions) {
      try {
        const result = await navigator.permissions.query({ name: "geolocation" });
        setGeolocationPermission(result.state === "granted");
      } catch (e) {
        console.error("Error checking geolocation permission:", e);
        setGeolocationPermission(false);
      }
      try {
        const result = await navigator.permissions.query({ name: "notifications" });
        setPushNotificationPermission(result.state === "granted");
      } catch (e) {
        console.error("Error checking push notification permission:", e);
        setPushNotificationPermission(false);
      }
    } else {
      setGeolocationPermission(true);
      setPushNotificationPermission(true);
    }
  };
  const handleRequestGeolocationPermission = async () => {
    if (navigator.permissions) {
      try {
        const result = await navigator.permissions.query({ name: "geolocation" });
        if (result.state === "prompt") {
          await navigator.geolocation.getCurrentPosition(
            () => {
              setGeolocationPermission(true);
              toast({
                title: t("geolocationGranted"),
                description: t("geolocationMessage")
              });
            },
            () => {
              setGeolocationPermission(false);
              toast({
                title: t("geolocationDenied"),
                description: t("geolocationMessage"),
                variant: "destructive"
              });
            }
          );
        } else if (result.state === "granted") {
          setGeolocationPermission(true);
          toast({
            title: t("geolocationActive"),
            description: t("geolocationMessage")
          });
        } else {
          setGeolocationPermission(false);
          toast({
            title: t("geolocationInactive"),
            description: t("geolocationMessage"),
            variant: "destructive"
          });
        }
      } catch (e) {
        console.error("Error requesting geolocation permission:", e);
        setGeolocationPermission(false);
        toast({
          title: t("errorTitle"),
          description: t("geolocationError"),
          variant: "destructive"
        });
      }
    } else {
      if (navigator.geolocation) {
        try {
          await navigator.geolocation.getCurrentPosition(
            () => {
              setGeolocationPermission(true);
              toast({
                title: t("geolocationGranted"),
                description: t("geolocationMessage")
              });
            },
            () => {
              setGeolocationPermission(false);
              toast({
                title: t("geolocationDenied"),
                description: t("geolocationMessage"),
                variant: "destructive"
              });
            }
          );
        } catch (e) {
          console.error("Error requesting geolocation permission (fallback):", e);
          setGeolocationPermission(false);
          toast({
            title: t("errorTitle"),
            description: t("geolocationError"),
            variant: "destructive"
          });
        }
      } else {
        setGeolocationPermission(false);
        toast({
          title: t("geolocationUnavailable"),
          description: t("geolocationMessage"),
          variant: "destructive"
        });
      }
    }
  };
  const handleRequestPushPermission = async () => {
    if (Notification.permission === "granted") {
      setPushNotificationPermission(true);
      toast({
        title: t("pushNotificationActive"),
        description: t("pushNotificationMessage")
      });
      return;
    }
    if (Notification.permission !== "denied") {
      try {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          setPushNotificationPermission(true);
          toast({
            title: t("pushNotificationGranted"),
            description: t("pushNotificationMessage")
          });
        } else {
          setPushNotificationPermission(false);
          toast({
            title: t("pushNotificationDenied"),
            description: t("pushNotificationMessage"),
            variant: "destructive"
          });
        }
      } catch (e) {
        console.error("Error requesting push notification permission:", e);
        setPushNotificationPermission(false);
        toast({
          title: t("errorTitle"),
          description: t("pushNotificationError"),
          variant: "destructive"
        });
      }
    } else {
      setPushNotificationPermission(false);
      toast({
        title: t("pushNotificationDenied"),
        description: t("pushNotificationMessage"),
        variant: "destructive"
      });
    }
  };
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-dark flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white", children: t("loading") }) });
  }
  if (!profile) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-dark flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white", children: t("profileNotFound") }) });
  }
  if (showAdminPanel) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminPanel, { onBack: () => setShowAdminPanel(false) });
  }
  if (showNotificationSettings) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(NotificationSettings, { onBack: () => setShowNotificationSettings(false) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-dark", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-6 pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold text-white text-center", children: t("profile") }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-6 pb-32", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "profile-card-neumorph bg-card/90 border-border", style: {
        borderRadius: "14px",
        background: "#1e2327",
        boxShadow: "inset -5px 5px 9px #14171a, inset 5px -5px 9px #282f34"
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-6 pb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-4 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { className: "w-16 h-16 bg-card/90 border border-border", children: profile.avatar_url ? /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarImage, { src: profile.avatar_url, alt: "Avatar" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "text-white text-lg font-bold bg-card/90", children: getUserInitials(profile.full_name, profile.email) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-dark rounded-full" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold text-white", children: profile.full_name || profile.email }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 mt-1", children: profile.username ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative group", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-r from-slate-800 via-gray-800 to-slate-700 border border-gray-600/50 rounded-xl px-3 py-1.5 flex items-center gap-2 shadow-lg backdrop-blur-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-gray-300 text-sm font-medium", children: [
                  "@",
                  profile.username
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    onClick: () => setIsUsernameEditDialogOpen(true),
                    className: "text-gray-400 hover:text-white transition-colors p-1 rounded-md hover:bg-gray-700/50",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(SquarePen, { className: "w-3 h-3" })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-slate-600/20 via-gray-600/20 to-slate-500/20 rounded-xl blur-sm -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" })
            ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                onClick: () => setIsUsernameEditDialogOpen(true),
                className: "bg-gradient-to-r from-slate-700/50 via-gray-700/50 to-slate-600/50 border border-gray-600/30 rounded-xl px-3 py-1.5 hover:from-slate-600/60 hover:via-gray-600/60 hover:to-slate-500/60 transition-all duration-200 text-sm flex items-center gap-2 group shadow-md",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-300 group-hover:text-white transition-colors", children: t("usernameEdit") }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SquarePen, { className: "w-3 h-3 text-gray-400 group-hover:text-white transition-colors" })
                ]
              }
            ) }),
            profile.bio ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-gray-300 text-sm italic leading-relaxed font-light bg-gradient-to-r from-slate-800/30 to-gray-800/30 border border-gray-700/40 rounded-lg px-3 py-2 backdrop-blur-sm", children: [
              '"',
              profile.bio,
              '"'
            ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 text-xs italic", children: t("noBioYet") }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2 mt-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(UserRoleBadge, { role: userRole, size: "md" }),
              (isAdmin() || isMasterAdmin()) && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-gradient-to-r from-purple-600 to-blue-600 text-white text-[10px] px-1.5 py-0.5 sm:text-xs sm:px-2 sm:py-1 whitespace-nowrap", children: "Admin Actions" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            onClick: () => setIsEditDialogOpen(true),
            variant: "outline",
            className: "w-full border-border text-white hover:bg-dark-light hover:border-white/50 transition-all duration-200",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SquarePen, { className: "w-4 h-4 mr-2" }),
              t("editProfile")
            ]
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "profile-card-neumorph bg-card/90 border-border", style: {
        borderRadius: "14px",
        background: "#1e2327",
        boxShadow: "inset -5px 5px 9px #14171a, inset 5px -5px 9px #282f34"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-white", children: t("statistics") }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-4 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-warning", children: stats.reports }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-gray-400", children: t("reports") })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-danger", children: stats.notifications }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-gray-400", children: t("notifications") })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-green-500", children: stats.days }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-gray-400", children: t("days") })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-blue-400", children: stats.xp.toLocaleString() }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-gray-400", children: "XP" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              levelInfo && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-lg font-bold text-purple-400 flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: levelInfo.emoji }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    "Lvl ",
                    stats.level
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-gray-400", children: getLevelName(levelInfo.name) })
              ] }),
              !levelInfo && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-2xl font-bold text-purple-400", children: [
                  "Lvl ",
                  stats.level
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-gray-400", children: "Level" })
              ] })
            ] })
          ] }) }),
          levelInfo && progressInfo && userXPData && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            UserLevelBadge,
            {
              levelInfo,
              currentXP: userXPData.total_xp,
              progress: progressInfo,
              size: "sm",
              showProgress: true,
              showXP: false,
              className: "w-full"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-4 border-t border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-medium text-white flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-yellow-400", children: "🏆" }),
              "Badges (",
              stats.badges,
              ")"
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2", children: userBadges.map((badge, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                onClick: () => handleBadgeClick(badge),
                className: `
                      relative p-2 rounded-lg border transition-all duration-300 hover:scale-105 cursor-pointer
                      ${badge.earned ? "bg-gradient-to-br from-card/60 to-card/40 border-yellow-500/40 shadow-lg hover:shadow-yellow-500/20" : "bg-gray-900/50 border-gray-700/50 opacity-40 hover:opacity-60"}
                    `,
                title: badge.earned ? `${t("earned")}: ${badge.earnedAt ? new Date(badge.earnedAt).toLocaleDateString() : t("recently")}` : badge.description,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `text-2xl mb-1 transition-all duration-300 ${badge.earned ? "filter-none transform hover:scale-110 hover:animate-bounce" : "grayscale brightness-50 contrast-75"}`, children: badge.emoji }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `text-xs font-medium mb-1 transition-colors duration-300 ${badge.earned ? "text-white" : "text-gray-600"}`, children: badge.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `text-[10px] px-1.5 py-0.5 rounded-full inline-block transition-all duration-300 ${badge.earned ? badge.rarity === "common" ? "bg-gray-600 text-gray-200" : badge.rarity === "uncommon" ? "bg-green-600 text-green-200" : badge.rarity === "rare" ? "bg-blue-600 text-blue-200" : badge.rarity === "epic" ? "bg-purple-600 text-purple-200" : badge.rarity === "legendary" ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold" : "bg-gray-600 text-gray-200" : "bg-gray-800 text-gray-600 border border-gray-700"}`, children: badge.rarity })
                  ] }),
                  badge.earned && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-1 -right-1 w-3 h-3 bg-green-500 border-2 border-dark rounded-full animate-pulse" }),
                  !badge.earned && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-gray-900/70 rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-gray-500 text-lg", children: "🔒" }) })
                ]
              },
              badge.id
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 text-xs text-gray-400 text-center", children: [
              userBadges.filter((b) => b.earned).length,
              " / ",
              userBadges.length,
              " ",
              t("badgesEarned")
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-2 border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              size: "sm",
              onClick: () => setIsXPGuideDialogOpen(true),
              className: "w-full text-gray-400 border-border hover:bg-dark-light hover:text-white transition-colors",
              children: t("howToEarnXP")
            }
          ) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "profile-card-neumorph relative overflow-hidden", style: {
        borderRadius: "14px",
        background: "#1e2327",
        boxShadow: "inset -5px 5px 9px #14171a, inset 5px -5px 9px #282f34",
        border: "1px solid #ffe08233"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-2 right-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "w-6 h-6 text-yellow-400" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-white flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent font-bold", children: t("radarPro") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-gradient-to-r from-yellow-500 to-amber-600 text-black text-xs px-2 py-1", children: "PRO" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-yellow-200 text-sm", children: t("radarProDesc") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-yellow-100", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1.5 h-1.5 bg-yellow-400 rounded-full" }),
              t("trafficAlerts")
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-yellow-100", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1.5 h-1.5 bg-yellow-400 rounded-full" }),
              t("advancedHeatmap")
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-yellow-100", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1.5 h-1.5 bg-yellow-400 rounded-full" }),
              t("smartNotifications")
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-yellow-100", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1.5 h-1.5 bg-yellow-400 rounded-full" }),
              t("communityFeatures")
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-2 border-t border-yellow-500/30", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-yellow-100", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: t("monthlyPrice") }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-yellow-300", children: t("freeTrial") })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right text-yellow-100", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs line-through text-yellow-400", children: t("yearlyPrice") }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-green-400", children: "Save 17%" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                onClick: () => setIsRadarProDialogOpen(true),
                className: "w-full bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 text-black font-semibold",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "w-4 h-4 mr-2" }),
                  t("upgradeToRadarPro")
                ]
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "profile-card-neumorph bg-card/90 border-border", style: {
        borderRadius: "14px",
        background: "#1e2327",
        boxShadow: "inset -5px 5px 9px #14171a, inset 5px -5px 9px #282f34"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-white flex items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-5 h-5 mr-2" }),
          t("notifications")
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 border-b border-border pb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-gray-400 mb-2", children: t("permissionStatus") }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white font-medium", children: t("geolocationPermission") }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-gray-400", children: t("geolocationDesc") })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  onClick: handleRequestGeolocationPermission,
                  className: `
                    ${geolocationPermission ? "border-green-500 text-green-500 hover:bg-green-500 hover:text-white" : "border-red-500 text-red-500 hover:bg-red-500 hover:text-white"}
                  `,
                  children: geolocationPermission ? t("geolocationActive") : t("geolocationInactive")
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white font-medium", children: t("pushNotificationPermission") }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-gray-400", children: t("pushNotificationDesc") })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  onClick: handleRequestPushPermission,
                  className: `
                    ${pushNotificationPermission ? "border-green-500 text-green-500 hover:bg-green-500 hover:text-white" : "border-red-500 text-red-500 hover:bg-red-500 hover:text-white"}
                  `,
                  children: pushNotificationPermission ? t("pushNotificationActive") : t("pushNotificationInactive")
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-gray-400 mb-2", children: t("notificationTypes") }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white font-medium", children: t("nearbyIncidents") }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-gray-400", children: t("nearbyIncidentsDesc") })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Switch,
                {
                  checked: notifications.nearby,
                  onCheckedChange: () => toggleNotification("nearby")
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white font-medium", children: t("emergencySituations") }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-gray-400", children: t("emergencySituationsDesc") })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Switch,
                {
                  checked: notifications.emergency,
                  onCheckedChange: () => toggleNotification("emergency")
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white font-medium", children: t("updates") }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-gray-400", children: t("updatesDesc") })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Switch,
                {
                  checked: notifications.updates,
                  onCheckedChange: () => toggleNotification("updates")
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-3 border-t border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-gray-400 mb-3", children: t("notificationSettingsDesc") }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                onClick: () => setShowNotificationSettings(true),
                variant: "outline",
                className: "w-full justify-between text-white border-border hover:bg-dark-light hover:border-white/50 transition-all duration-200",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "w-4 h-4 mr-2" }),
                    t("notificationSettings")
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
                ]
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "profile-card-neumorph bg-card/90 border-border", style: {
        borderRadius: "14px",
        background: "#1e2327",
        boxShadow: "inset -5px 5px 9px #14171a, inset 5px -5px 9px #282f34"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-white flex items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-5 h-5 mr-2" }),
          t("location")
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white font-medium", children: t("tracking") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-gray-400", children: t("trackingDesc") })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-green-600 text-white", children: t("enabled") })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white font-medium", children: t("alertRadius") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-gray-400", children: t("alertRadiusDesc") }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-warning mt-1", children: [
                t("currentRadius"),
                ": ",
                formatDistance(alertRadius)
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                size: "sm",
                onClick: () => setIsRadiusDialogOpen(true),
                className: "text-white border-border hover:bg-dark-light",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "w-4 h-4 mr-2" }),
                  t("settings")
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white font-medium", children: t("cacheManagement") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-gray-400", children: t("cacheManagementDesc") })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                size: "sm",
                onClick: handleClearLocationCache,
                className: "text-orange-500 border-orange-500 hover:bg-orange-500 hover:text-white",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4 mr-2" }),
                  t("clearCache")
                ]
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "profile-card-neumorph bg-card/90 border-border", style: {
        borderRadius: "14px",
        background: "#1e2327",
        boxShadow: "inset -5px 5px 9px #14171a, inset 5px -5px 9px #282f34"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-white flex items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "w-5 h-5 mr-2" }),
          t("settings")
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              className: "w-full justify-start text-gray-400 hover:text-white",
              onClick: () => setIsPrivacyDialogOpen(true),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-4 h-4 mr-2" }),
                "Privacy Policy"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              className: "w-full justify-start text-gray-400 hover:text-white",
              onClick: () => setIsTermsDialogOpen(true),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Scale, { className: "w-4 h-4 mr-2" }),
                "Terms of Use"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              className: "w-full justify-start text-gray-400 hover:text-white",
              onClick: () => setIsContactSupportDialogOpen(true),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleHelp, { className: "w-4 h-4 mr-2" }),
                "Contact Support"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              className: "w-full justify-start text-gray-400 hover:text-white",
              onClick: () => setIsAboutDialogOpen(true),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "w-4 h-4 mr-2" }),
                "About App"
              ]
            }
          )
        ] })
      ] }),
      (isAdmin() || isMasterAdmin()) && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "profile-card-neumorph bg-card/90 border-border", style: {
        borderRadius: "14px",
        background: "#1e2327",
        boxShadow: "inset -5px 5px 9px #14171a, inset 5px -5px 9px #282f34"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-white flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-5 h-5" }),
          "Moderation Panel"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-input bg-background hover:bg-accent hover:text-accent-foreground p-3 rounded-lg transition-colors", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-medium text-white mb-1", children: "Access Rights" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "text-xs text-gray-400 space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Delete incidents" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Delete messages" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Delete announcements" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Report moderation" }),
                isMasterAdmin() && /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Role management" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-input bg-background hover:bg-accent hover:text-accent-foreground p-3 rounded-lg transition-colors", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-medium text-white mb-1", children: "Statistics" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-gray-400 space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  "Role: ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white", children: userRole === "master_admin" ? "Master Admin" : "Admin" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  "Access: ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-green-400", children: "Active" })
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              onClick: () => setShowAdminPanel(true),
              className: "w-full justify-start text-gray-400 hover:text-white py-3",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "w-4 h-4 mr-2" }),
                "Open Admin Panel"
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          onClick: handleLogout,
          variant: "destructive",
          className: "w-full bg-danger hover:bg-danger-light text-white py-4",
          children: t("logout")
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      EditProfileDialog,
      {
        isOpen: isEditDialogOpen,
        onClose: () => setIsEditDialogOpen(false),
        userEmail: profile.email,
        userName: profile.full_name || "",
        userAvatar: profile.avatar_url || "",
        userBio: profile.bio || "",
        onProfileUpdate: handleProfileUpdate
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AlertRadiusDialog,
      {
        isOpen: isRadiusDialogOpen,
        onClose: () => setIsRadiusDialogOpen(false),
        currentRadius: alertRadius,
        onRadiusChange: setAlertRadius
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AboutAppDialog,
      {
        open: isAboutDialogOpen,
        onOpenChange: setIsAboutDialogOpen
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      TermsOfUseDialog,
      {
        open: isTermsDialogOpen,
        onOpenChange: setIsTermsDialogOpen
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PrivacyPolicyDialog,
      {
        open: isPrivacyDialogOpen,
        onOpenChange: setIsPrivacyDialogOpen
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ContactSupportDialog,
      {
        open: isContactSupportDialogOpen,
        onOpenChange: setIsContactSupportDialogOpen
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      RadarProDialog,
      {
        open: isRadarProDialogOpen,
        onOpenChange: setIsRadarProDialogOpen
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      XPGuideDialog,
      {
        isOpen: isXPGuideDialogOpen,
        onClose: () => setIsXPGuideDialogOpen(false)
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      BadgeDetailDialog,
      {
        isOpen: isBadgeDetailDialogOpen,
        onClose: () => setIsBadgeDetailDialogOpen(false),
        badge: selectedBadge
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      UsernameEditDialog,
      {
        isOpen: isUsernameEditDialogOpen,
        onClose: () => setIsUsernameEditDialogOpen(false),
        currentUsername: profile.username || "",
        onUsernameUpdate: handleUsernameUpdate
      }
    )
  ] });
};
export {
  ProfileScreen as default
};
