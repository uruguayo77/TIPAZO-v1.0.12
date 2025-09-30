import { b6 as ownerDocument, b7 as clsx, b8 as resolveComponentProps, b9 as mergeSlotProps$1, ba as useForkRef, bb as appendOwnerState, bc as getReactElementRef, bd as useEnhancedEffect, be as useEventCallback, j as jsxRuntimeExports, bf as generateUtilityClasses, bg as generateUtilityClass, bh as capitalize, bi as styled, bj as memoTheme, bk as useDefaultProps, bl as composeClasses, bm as globalCss, bn as formatMuiErrorMessage, bo as createSvgIcon, bp as useTheme, bq as Transition, br as reflow, bs as getTransitionProps, bt as useSlot, bu as extractEventHandlers, bv as rootShouldForwardProp, bw as createSimplePaletteValueFilter, bx as deepmerge, by as Paper, bz as Grow, bA as useRtl, bB as slotShouldForwardProp, bC as useId, l as useAuth, aZ as useQueryClient, aF as realtimeService, a_ as useMutation, x as supabase, t as toast, k as useLanguage, aB as MessageCircle, W as Dialog, at as DialogTrigger, B as Button, X as DialogContent, Y as DialogHeader, Z as DialogTitle, O as OptimizedInput, s as OptimizedTextarea, C as Card, p as CardContent, v as Badge, ap as Crown, aj as Trash2, r as Clock, b5 as formatDateOnly, c as createContextScope, u as useComposedRefs, h as useControllableState, P as Primitive, a as composeEventHandlers, b as Presence, d as usePrevious, e as useSize, i as cn, as as Search, b3 as X, bD as formatTimeAMPM, aA as Send, bE as Overlay, bF as Content, bG as Close, bH as Title, bI as Description, bJ as Portal$1, bK as cva, bL as Root$2, bM as Trigger, am as useUserRole$1, al as ScrollArea, a0 as EyeOff, _ as Label, b4 as User, a6 as useToast, bN as Capacitor, bO as ZoomIn, aY as ChevronLeft, bP as AnimatePresence, aE as motion, aH as ChevronRight, bQ as UserProfileCard, b2 as LanguageToggle, ao as Users, ac as TriangleAlert, n as CardHeader, o as CardTitle, M as MapPin, bR as ThumbsUp, bS as ThumbsDown } from "./index-CZYVfY9K.js";
import { r as reactExports, a as reactDomExports, R as React, u as useNavigate } from "./vendor-CYUu28OS.js";
import { f as SquarePen, e as Switch, S as Select$1, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem, H as Heart, C as ChevronDown } from "./select-Otq6mO8S.js";
import { u as useQuery, U as UserRoleBadgeWrapper, I as Image$1 } from "./UserRoleBadgeWrapper-DMxU8KTQ.js";
import { P as Plus } from "./plus-B7vZspfX.js";
import { C as Check } from "./check-CPZybvMl.js";
import { A as ArrowLeft } from "./arrow-left-BjTckGNp.js";
import { C as Camera$1, a as CameraResultType, b as CameraSource } from "./index-BJAMM_Pa.js";
import { C as Camera } from "./camera-BfDh98wj.js";
function isMuiElement(element, muiNames) {
  return /* @__PURE__ */ reactExports.isValidElement(element) && muiNames.indexOf(
    // For server components `muiName` is avaialble in element.type._payload.value.muiName
    // relevant info - https://github.com/facebook/react/blob/2807d781a08db8e9873687fccc25c0f12b4fb3d4/packages/react/src/ReactLazy.js#L45
    // eslint-disable-next-line no-underscore-dangle
    element.type.muiName ?? element.type?._payload?.value?.muiName
  ) !== -1;
}
function createChainedFunction(...funcs) {
  return funcs.reduce((acc, func) => {
    if (func == null) {
      return acc;
    }
    return function chainedFunction(...args) {
      acc.apply(this, args);
      func.apply(this, args);
    };
  }, () => {
  });
}
function debounce(func, wait = 166) {
  let timeout;
  function debounced(...args) {
    const later = () => {
      func.apply(this, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  }
  debounced.clear = () => {
    clearTimeout(timeout);
  };
  return debounced;
}
function ownerWindow(node) {
  const doc = ownerDocument(node);
  return doc.defaultView || window;
}
function setRef(ref, value) {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref) {
    ref.current = value;
  }
}
function useControlled(props) {
  const {
    controlled,
    default: defaultProp,
    name,
    state = "value"
  } = props;
  const {
    current: isControlled
  } = reactExports.useRef(controlled !== void 0);
  const [valueState, setValue] = reactExports.useState(defaultProp);
  const value = isControlled ? controlled : valueState;
  const setValueIfUncontrolled = reactExports.useCallback((newValue) => {
    if (!isControlled) {
      setValue(newValue);
    }
  }, []);
  return [value, setValueIfUncontrolled];
}
function isEventHandler(key, value) {
  const thirdCharCode = key.charCodeAt(2);
  return key[0] === "o" && key[1] === "n" && thirdCharCode >= 65 && thirdCharCode <= 90 && typeof value === "function";
}
function mergeSlotProps(externalSlotProps, defaultSlotProps) {
  if (!externalSlotProps) {
    return defaultSlotProps;
  }
  function extractHandlers(externalSlotPropsValue, defaultSlotPropsValue) {
    const handlers2 = {};
    Object.keys(defaultSlotPropsValue).forEach((key) => {
      if (isEventHandler(key, defaultSlotPropsValue[key]) && typeof externalSlotPropsValue[key] === "function") {
        handlers2[key] = (...args) => {
          externalSlotPropsValue[key](...args);
          defaultSlotPropsValue[key](...args);
        };
      }
    });
    return handlers2;
  }
  if (typeof externalSlotProps === "function" || typeof defaultSlotProps === "function") {
    return (ownerState) => {
      const defaultSlotPropsValue = typeof defaultSlotProps === "function" ? defaultSlotProps(ownerState) : defaultSlotProps;
      const externalSlotPropsValue = typeof externalSlotProps === "function" ? externalSlotProps({
        ...ownerState,
        ...defaultSlotPropsValue
      }) : externalSlotProps;
      const className2 = clsx(ownerState?.className, defaultSlotPropsValue?.className, externalSlotPropsValue?.className);
      const handlers2 = extractHandlers(externalSlotPropsValue, defaultSlotPropsValue);
      return {
        ...defaultSlotPropsValue,
        ...externalSlotPropsValue,
        ...handlers2,
        ...!!className2 && {
          className: className2
        },
        ...defaultSlotPropsValue?.style && externalSlotPropsValue?.style && {
          style: {
            ...defaultSlotPropsValue.style,
            ...externalSlotPropsValue.style
          }
        },
        ...defaultSlotPropsValue?.sx && externalSlotPropsValue?.sx && {
          sx: [...Array.isArray(defaultSlotPropsValue.sx) ? defaultSlotPropsValue.sx : [defaultSlotPropsValue.sx], ...Array.isArray(externalSlotPropsValue.sx) ? externalSlotPropsValue.sx : [externalSlotPropsValue.sx]]
        }
      };
    };
  }
  const typedDefaultSlotProps = defaultSlotProps;
  const handlers = extractHandlers(externalSlotProps, typedDefaultSlotProps);
  const className = clsx(typedDefaultSlotProps?.className, externalSlotProps?.className);
  return {
    ...defaultSlotProps,
    ...externalSlotProps,
    ...handlers,
    ...!!className && {
      className
    },
    ...typedDefaultSlotProps?.style && externalSlotProps?.style && {
      style: {
        ...typedDefaultSlotProps.style,
        ...externalSlotProps.style
      }
    },
    ...typedDefaultSlotProps?.sx && externalSlotProps?.sx && {
      sx: [...Array.isArray(typedDefaultSlotProps.sx) ? typedDefaultSlotProps.sx : [typedDefaultSlotProps.sx], ...Array.isArray(externalSlotProps.sx) ? externalSlotProps.sx : [externalSlotProps.sx]]
    }
  };
}
function useSlotProps(parameters) {
  const {
    elementType,
    externalSlotProps,
    ownerState,
    skipResolvingSlotProps = false,
    ...other
  } = parameters;
  const resolvedComponentsProps = skipResolvingSlotProps ? {} : resolveComponentProps(externalSlotProps, ownerState);
  const {
    props: mergedProps,
    internalRef
  } = mergeSlotProps$1({
    ...other,
    externalSlotProps: resolvedComponentsProps
  });
  const ref = useForkRef(internalRef, resolvedComponentsProps?.ref, parameters.additionalProps?.ref);
  const props = appendOwnerState(elementType, {
    ...mergedProps,
    ref
  }, ownerState);
  return props;
}
function getContainer$1(container) {
  return typeof container === "function" ? container() : container;
}
const Portal = /* @__PURE__ */ reactExports.forwardRef(function Portal2(props, forwardedRef) {
  const {
    children,
    container,
    disablePortal = false
  } = props;
  const [mountNode, setMountNode] = reactExports.useState(null);
  const handleRef = useForkRef(/* @__PURE__ */ reactExports.isValidElement(children) ? getReactElementRef(children) : null, forwardedRef);
  useEnhancedEffect(() => {
    if (!disablePortal) {
      setMountNode(getContainer$1(container) || document.body);
    }
  }, [container, disablePortal]);
  useEnhancedEffect(() => {
    if (mountNode && !disablePortal) {
      setRef(forwardedRef, mountNode);
      return () => {
        setRef(forwardedRef, null);
      };
    }
    return void 0;
  }, [forwardedRef, mountNode, disablePortal]);
  if (disablePortal) {
    if (/* @__PURE__ */ reactExports.isValidElement(children)) {
      const newProps = {
        ref: handleRef
      };
      return /* @__PURE__ */ reactExports.cloneElement(children, newProps);
    }
    return children;
  }
  return mountNode ? /* @__PURE__ */ reactDomExports.createPortal(children, mountNode) : mountNode;
});
function getStyleValue(value) {
  return parseInt(value, 10) || 0;
}
const styles$1 = {
  shadow: {
    // Visibility needed to hide the extra text area on iPads
    visibility: "hidden",
    // Remove from the content flow
    position: "absolute",
    // Ignore the scrollbar width
    overflow: "hidden",
    height: 0,
    top: 0,
    left: 0,
    // Create a new layer, increase the isolation of the computed values
    transform: "translateZ(0)"
  }
};
function isObjectEmpty(object) {
  for (const _ in object) {
    return false;
  }
  return true;
}
function isEmpty$1(obj) {
  return isObjectEmpty(obj) || obj.outerHeightStyle === 0 && !obj.overflowing;
}
const TextareaAutosize = /* @__PURE__ */ reactExports.forwardRef(function TextareaAutosize2(props, forwardedRef) {
  const {
    onChange,
    maxRows,
    minRows = 1,
    style,
    value,
    ...other
  } = props;
  const {
    current: isControlled
  } = reactExports.useRef(value != null);
  const textareaRef = reactExports.useRef(null);
  const handleRef = useForkRef(forwardedRef, textareaRef);
  const heightRef = reactExports.useRef(null);
  const hiddenTextareaRef = reactExports.useRef(null);
  const calculateTextareaStyles = reactExports.useCallback(() => {
    const textarea = textareaRef.current;
    const hiddenTextarea = hiddenTextareaRef.current;
    if (!textarea || !hiddenTextarea) {
      return void 0;
    }
    const containerWindow = ownerWindow(textarea);
    const computedStyle = containerWindow.getComputedStyle(textarea);
    if (computedStyle.width === "0px") {
      return {
        outerHeightStyle: 0,
        overflowing: false
      };
    }
    hiddenTextarea.style.width = computedStyle.width;
    hiddenTextarea.value = textarea.value || props.placeholder || "x";
    if (hiddenTextarea.value.slice(-1) === "\n") {
      hiddenTextarea.value += " ";
    }
    const boxSizing = computedStyle.boxSizing;
    const padding = getStyleValue(computedStyle.paddingBottom) + getStyleValue(computedStyle.paddingTop);
    const border = getStyleValue(computedStyle.borderBottomWidth) + getStyleValue(computedStyle.borderTopWidth);
    const innerHeight = hiddenTextarea.scrollHeight;
    hiddenTextarea.value = "x";
    const singleRowHeight = hiddenTextarea.scrollHeight;
    let outerHeight = innerHeight;
    if (minRows) {
      outerHeight = Math.max(Number(minRows) * singleRowHeight, outerHeight);
    }
    if (maxRows) {
      outerHeight = Math.min(Number(maxRows) * singleRowHeight, outerHeight);
    }
    outerHeight = Math.max(outerHeight, singleRowHeight);
    const outerHeightStyle = outerHeight + (boxSizing === "border-box" ? padding + border : 0);
    const overflowing = Math.abs(outerHeight - innerHeight) <= 1;
    return {
      outerHeightStyle,
      overflowing
    };
  }, [maxRows, minRows, props.placeholder]);
  const didHeightChange = useEventCallback(() => {
    const textarea = textareaRef.current;
    const textareaStyles = calculateTextareaStyles();
    if (!textarea || !textareaStyles || isEmpty$1(textareaStyles)) {
      return false;
    }
    const outerHeightStyle = textareaStyles.outerHeightStyle;
    return heightRef.current != null && heightRef.current !== outerHeightStyle;
  });
  const syncHeight = reactExports.useCallback(() => {
    const textarea = textareaRef.current;
    const textareaStyles = calculateTextareaStyles();
    if (!textarea || !textareaStyles || isEmpty$1(textareaStyles)) {
      return;
    }
    const outerHeightStyle = textareaStyles.outerHeightStyle;
    if (heightRef.current !== outerHeightStyle) {
      heightRef.current = outerHeightStyle;
      textarea.style.height = `${outerHeightStyle}px`;
    }
    textarea.style.overflow = textareaStyles.overflowing ? "hidden" : "";
  }, [calculateTextareaStyles]);
  const frameRef = reactExports.useRef(-1);
  useEnhancedEffect(() => {
    const debouncedHandleResize = debounce(syncHeight);
    const textarea = textareaRef?.current;
    if (!textarea) {
      return void 0;
    }
    const containerWindow = ownerWindow(textarea);
    containerWindow.addEventListener("resize", debouncedHandleResize);
    let resizeObserver;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(() => {
        if (didHeightChange()) {
          resizeObserver.unobserve(textarea);
          cancelAnimationFrame(frameRef.current);
          syncHeight();
          frameRef.current = requestAnimationFrame(() => {
            resizeObserver.observe(textarea);
          });
        }
      });
      resizeObserver.observe(textarea);
    }
    return () => {
      debouncedHandleResize.clear();
      cancelAnimationFrame(frameRef.current);
      containerWindow.removeEventListener("resize", debouncedHandleResize);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [calculateTextareaStyles, syncHeight, didHeightChange]);
  useEnhancedEffect(() => {
    syncHeight();
  });
  const handleChange = (event) => {
    if (!isControlled) {
      syncHeight();
    }
    const textarea = event.target;
    const countOfCharacters = textarea.value.length;
    const isLastCharacterNewLine = textarea.value.endsWith("\n");
    const isEndOfTheLine = textarea.selectionStart === countOfCharacters;
    if (isLastCharacterNewLine && isEndOfTheLine) {
      textarea.setSelectionRange(countOfCharacters, countOfCharacters);
    }
    if (onChange) {
      onChange(event);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(reactExports.Fragment, {
    children: [/* @__PURE__ */ jsxRuntimeExports.jsx("textarea", {
      value,
      onChange: handleChange,
      ref: handleRef,
      rows: minRows,
      style,
      ...other
    }), /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", {
      "aria-hidden": true,
      className: props.className,
      readOnly: true,
      ref: hiddenTextareaRef,
      tabIndex: -1,
      style: {
        ...styles$1.shadow,
        ...style,
        paddingTop: 0,
        paddingBottom: 0
      }
    })]
  });
});
function isHostComponent(element) {
  return typeof element === "string";
}
function formControlState({
  props,
  states,
  muiFormControl
}) {
  return states.reduce((acc, state) => {
    acc[state] = props[state];
    if (muiFormControl) {
      if (typeof props[state] === "undefined") {
        acc[state] = muiFormControl[state];
      }
    }
    return acc;
  }, {});
}
const FormControlContext = /* @__PURE__ */ reactExports.createContext(void 0);
function useFormControl() {
  return reactExports.useContext(FormControlContext);
}
function hasValue(value) {
  return value != null && !(Array.isArray(value) && value.length === 0);
}
function isFilled(obj, SSR = false) {
  return obj && (hasValue(obj.value) && obj.value !== "" || SSR && hasValue(obj.defaultValue) && obj.defaultValue !== "");
}
function isAdornedStart(obj) {
  return obj.startAdornment;
}
function getInputBaseUtilityClass(slot) {
  return generateUtilityClass("MuiInputBase", slot);
}
const inputBaseClasses = generateUtilityClasses("MuiInputBase", ["root", "formControl", "focused", "disabled", "adornedStart", "adornedEnd", "error", "sizeSmall", "multiline", "colorSecondary", "fullWidth", "hiddenLabel", "readOnly", "input", "inputSizeSmall", "inputMultiline", "inputTypeSearch", "inputAdornedStart", "inputAdornedEnd", "inputHiddenLabel"]);
var _InputGlobalStyles;
const rootOverridesResolver = (props, styles2) => {
  const {
    ownerState
  } = props;
  return [styles2.root, ownerState.formControl && styles2.formControl, ownerState.startAdornment && styles2.adornedStart, ownerState.endAdornment && styles2.adornedEnd, ownerState.error && styles2.error, ownerState.size === "small" && styles2.sizeSmall, ownerState.multiline && styles2.multiline, ownerState.color && styles2[`color${capitalize(ownerState.color)}`], ownerState.fullWidth && styles2.fullWidth, ownerState.hiddenLabel && styles2.hiddenLabel];
};
const inputOverridesResolver = (props, styles2) => {
  const {
    ownerState
  } = props;
  return [styles2.input, ownerState.size === "small" && styles2.inputSizeSmall, ownerState.multiline && styles2.inputMultiline, ownerState.type === "search" && styles2.inputTypeSearch, ownerState.startAdornment && styles2.inputAdornedStart, ownerState.endAdornment && styles2.inputAdornedEnd, ownerState.hiddenLabel && styles2.inputHiddenLabel];
};
const useUtilityClasses$g = (ownerState) => {
  const {
    classes,
    color,
    disabled,
    error,
    endAdornment,
    focused,
    formControl,
    fullWidth,
    hiddenLabel,
    multiline,
    readOnly,
    size,
    startAdornment,
    type
  } = ownerState;
  const slots = {
    root: ["root", `color${capitalize(color)}`, disabled && "disabled", error && "error", fullWidth && "fullWidth", focused && "focused", formControl && "formControl", size && size !== "medium" && `size${capitalize(size)}`, multiline && "multiline", startAdornment && "adornedStart", endAdornment && "adornedEnd", hiddenLabel && "hiddenLabel", readOnly && "readOnly"],
    input: ["input", disabled && "disabled", type === "search" && "inputTypeSearch", multiline && "inputMultiline", size === "small" && "inputSizeSmall", hiddenLabel && "inputHiddenLabel", startAdornment && "inputAdornedStart", endAdornment && "inputAdornedEnd", readOnly && "readOnly"]
  };
  return composeClasses(slots, getInputBaseUtilityClass, classes);
};
const InputBaseRoot = styled("div", {
  name: "MuiInputBase",
  slot: "Root",
  overridesResolver: rootOverridesResolver
})(memoTheme(({
  theme
}) => ({
  ...theme.typography.body1,
  color: (theme.vars || theme).palette.text.primary,
  lineHeight: "1.4375em",
  // 23px
  boxSizing: "border-box",
  // Prevent padding issue with fullWidth.
  position: "relative",
  cursor: "text",
  display: "inline-flex",
  alignItems: "center",
  [`&.${inputBaseClasses.disabled}`]: {
    color: (theme.vars || theme).palette.text.disabled,
    cursor: "default"
  },
  variants: [{
    props: ({
      ownerState
    }) => ownerState.multiline,
    style: {
      padding: "4px 0 5px"
    }
  }, {
    props: ({
      ownerState,
      size
    }) => ownerState.multiline && size === "small",
    style: {
      paddingTop: 1
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.fullWidth,
    style: {
      width: "100%"
    }
  }]
})));
const InputBaseInput = styled("input", {
  name: "MuiInputBase",
  slot: "Input",
  overridesResolver: inputOverridesResolver
})(memoTheme(({
  theme
}) => {
  const light = theme.palette.mode === "light";
  const placeholder = {
    color: "currentColor",
    ...theme.vars ? {
      opacity: theme.vars.opacity.inputPlaceholder
    } : {
      opacity: light ? 0.42 : 0.5
    },
    transition: theme.transitions.create("opacity", {
      duration: theme.transitions.duration.shorter
    })
  };
  const placeholderHidden = {
    opacity: "0 !important"
  };
  const placeholderVisible = theme.vars ? {
    opacity: theme.vars.opacity.inputPlaceholder
  } : {
    opacity: light ? 0.42 : 0.5
  };
  return {
    font: "inherit",
    letterSpacing: "inherit",
    color: "currentColor",
    padding: "4px 0 5px",
    border: 0,
    boxSizing: "content-box",
    background: "none",
    height: "1.4375em",
    // Reset 23pxthe native input line-height
    margin: 0,
    // Reset for Safari
    WebkitTapHighlightColor: "transparent",
    display: "block",
    // Make the flex item shrink with Firefox
    minWidth: 0,
    width: "100%",
    "&::-webkit-input-placeholder": placeholder,
    "&::-moz-placeholder": placeholder,
    // Firefox 19+
    "&::-ms-input-placeholder": placeholder,
    // Edge
    "&:focus": {
      outline: 0
    },
    // Reset Firefox invalid required input style
    "&:invalid": {
      boxShadow: "none"
    },
    "&::-webkit-search-decoration": {
      // Remove the padding when type=search.
      WebkitAppearance: "none"
    },
    // Show and hide the placeholder logic
    [`label[data-shrink=false] + .${inputBaseClasses.formControl} &`]: {
      "&::-webkit-input-placeholder": placeholderHidden,
      "&::-moz-placeholder": placeholderHidden,
      // Firefox 19+
      "&::-ms-input-placeholder": placeholderHidden,
      // Edge
      "&:focus::-webkit-input-placeholder": placeholderVisible,
      "&:focus::-moz-placeholder": placeholderVisible,
      // Firefox 19+
      "&:focus::-ms-input-placeholder": placeholderVisible
      // Edge
    },
    [`&.${inputBaseClasses.disabled}`]: {
      opacity: 1,
      // Reset iOS opacity
      WebkitTextFillColor: (theme.vars || theme).palette.text.disabled
      // Fix opacity Safari bug
    },
    variants: [{
      props: ({
        ownerState
      }) => !ownerState.disableInjectingGlobalStyles,
      style: {
        animationName: "mui-auto-fill-cancel",
        animationDuration: "10ms",
        "&:-webkit-autofill": {
          animationDuration: "5000s",
          animationName: "mui-auto-fill"
        }
      }
    }, {
      props: {
        size: "small"
      },
      style: {
        paddingTop: 1
      }
    }, {
      props: ({
        ownerState
      }) => ownerState.multiline,
      style: {
        height: "auto",
        resize: "none",
        padding: 0,
        paddingTop: 0
      }
    }, {
      props: {
        type: "search"
      },
      style: {
        MozAppearance: "textfield"
        // Improve type search style.
      }
    }]
  };
}));
const InputGlobalStyles = globalCss({
  "@keyframes mui-auto-fill": {
    from: {
      display: "block"
    }
  },
  "@keyframes mui-auto-fill-cancel": {
    from: {
      display: "block"
    }
  }
});
const InputBase = /* @__PURE__ */ reactExports.forwardRef(function InputBase2(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: "MuiInputBase"
  });
  const {
    "aria-describedby": ariaDescribedby,
    autoComplete,
    autoFocus,
    className,
    color,
    components = {},
    componentsProps = {},
    defaultValue,
    disabled,
    disableInjectingGlobalStyles,
    endAdornment,
    error,
    fullWidth = false,
    id,
    inputComponent = "input",
    inputProps: inputPropsProp = {},
    inputRef: inputRefProp,
    margin,
    maxRows,
    minRows,
    multiline = false,
    name,
    onBlur,
    onChange,
    onClick,
    onFocus,
    onKeyDown,
    onKeyUp,
    placeholder,
    readOnly,
    renderSuffix,
    rows,
    size,
    slotProps = {},
    slots = {},
    startAdornment,
    type = "text",
    value: valueProp,
    ...other
  } = props;
  const value = inputPropsProp.value != null ? inputPropsProp.value : valueProp;
  const {
    current: isControlled
  } = reactExports.useRef(value != null);
  const inputRef = reactExports.useRef();
  const handleInputRefWarning = reactExports.useCallback((instance) => {
  }, []);
  const handleInputRef = useForkRef(inputRef, inputRefProp, inputPropsProp.ref, handleInputRefWarning);
  const [focused, setFocused] = reactExports.useState(false);
  const muiFormControl = useFormControl();
  const fcs = formControlState({
    props,
    muiFormControl,
    states: ["color", "disabled", "error", "hiddenLabel", "size", "required", "filled"]
  });
  fcs.focused = muiFormControl ? muiFormControl.focused : focused;
  reactExports.useEffect(() => {
    if (!muiFormControl && disabled && focused) {
      setFocused(false);
      if (onBlur) {
        onBlur();
      }
    }
  }, [muiFormControl, disabled, focused, onBlur]);
  const onFilled = muiFormControl && muiFormControl.onFilled;
  const onEmpty = muiFormControl && muiFormControl.onEmpty;
  const checkDirty = reactExports.useCallback((obj) => {
    if (isFilled(obj)) {
      if (onFilled) {
        onFilled();
      }
    } else if (onEmpty) {
      onEmpty();
    }
  }, [onFilled, onEmpty]);
  useEnhancedEffect(() => {
    if (isControlled) {
      checkDirty({
        value
      });
    }
  }, [value, checkDirty, isControlled]);
  const handleFocus = (event) => {
    if (onFocus) {
      onFocus(event);
    }
    if (inputPropsProp.onFocus) {
      inputPropsProp.onFocus(event);
    }
    if (muiFormControl && muiFormControl.onFocus) {
      muiFormControl.onFocus(event);
    } else {
      setFocused(true);
    }
  };
  const handleBlur = (event) => {
    if (onBlur) {
      onBlur(event);
    }
    if (inputPropsProp.onBlur) {
      inputPropsProp.onBlur(event);
    }
    if (muiFormControl && muiFormControl.onBlur) {
      muiFormControl.onBlur(event);
    } else {
      setFocused(false);
    }
  };
  const handleChange = (event, ...args) => {
    if (!isControlled) {
      const element = event.target || inputRef.current;
      if (element == null) {
        throw new Error(formatMuiErrorMessage(1));
      }
      checkDirty({
        value: element.value
      });
    }
    if (inputPropsProp.onChange) {
      inputPropsProp.onChange(event, ...args);
    }
    if (onChange) {
      onChange(event, ...args);
    }
  };
  reactExports.useEffect(() => {
    checkDirty(inputRef.current);
  }, []);
  const handleClick = (event) => {
    if (inputRef.current && event.currentTarget === event.target) {
      inputRef.current.focus();
    }
    if (onClick) {
      onClick(event);
    }
  };
  let InputComponent = inputComponent;
  let inputProps = inputPropsProp;
  if (multiline && InputComponent === "input") {
    if (rows) {
      inputProps = {
        type: void 0,
        minRows: rows,
        maxRows: rows,
        ...inputProps
      };
    } else {
      inputProps = {
        type: void 0,
        maxRows,
        minRows,
        ...inputProps
      };
    }
    InputComponent = TextareaAutosize;
  }
  const handleAutoFill = (event) => {
    checkDirty(event.animationName === "mui-auto-fill-cancel" ? inputRef.current : {
      value: "x"
    });
  };
  reactExports.useEffect(() => {
    if (muiFormControl) {
      muiFormControl.setAdornedStart(Boolean(startAdornment));
    }
  }, [muiFormControl, startAdornment]);
  const ownerState = {
    ...props,
    color: fcs.color || "primary",
    disabled: fcs.disabled,
    endAdornment,
    error: fcs.error,
    focused: fcs.focused,
    formControl: muiFormControl,
    fullWidth,
    hiddenLabel: fcs.hiddenLabel,
    multiline,
    size: fcs.size,
    startAdornment,
    type
  };
  const classes = useUtilityClasses$g(ownerState);
  const Root2 = slots.root || components.Root || InputBaseRoot;
  const rootProps = slotProps.root || componentsProps.root || {};
  const Input3 = slots.input || components.Input || InputBaseInput;
  inputProps = {
    ...inputProps,
    ...slotProps.input ?? componentsProps.input
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(reactExports.Fragment, {
    children: [!disableInjectingGlobalStyles && typeof InputGlobalStyles === "function" && // For Emotion/Styled-components, InputGlobalStyles will be a function
    // For Pigment CSS, this has no effect because the InputGlobalStyles will be null.
    (_InputGlobalStyles || (_InputGlobalStyles = /* @__PURE__ */ jsxRuntimeExports.jsx(InputGlobalStyles, {}))), /* @__PURE__ */ jsxRuntimeExports.jsxs(Root2, {
      ...rootProps,
      ref,
      onClick: handleClick,
      ...other,
      ...!isHostComponent(Root2) && {
        ownerState: {
          ...ownerState,
          ...rootProps.ownerState
        }
      },
      className: clsx(classes.root, rootProps.className, className, readOnly && "MuiInputBase-readOnly"),
      children: [startAdornment, /* @__PURE__ */ jsxRuntimeExports.jsx(FormControlContext.Provider, {
        value: null,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input3, {
          "aria-invalid": fcs.error,
          "aria-describedby": ariaDescribedby,
          autoComplete,
          autoFocus,
          defaultValue,
          disabled: fcs.disabled,
          id,
          onAnimationStart: handleAutoFill,
          name,
          placeholder,
          readOnly,
          required: fcs.required,
          rows,
          value,
          onKeyDown,
          onKeyUp,
          type,
          ...inputProps,
          ...!isHostComponent(Input3) && {
            as: InputComponent,
            ownerState: {
              ...ownerState,
              ...inputProps.ownerState
            }
          },
          ref: handleInputRef,
          className: clsx(classes.input, inputProps.className, readOnly && "MuiInputBase-readOnly"),
          onBlur: handleBlur,
          onChange: handleChange,
          onFocus: handleFocus
        })
      }), endAdornment, renderSuffix ? renderSuffix({
        ...fcs,
        startAdornment
      }) : null]
    })]
  });
});
function getInputUtilityClass(slot) {
  return generateUtilityClass("MuiInput", slot);
}
const inputClasses = {
  ...inputBaseClasses,
  ...generateUtilityClasses("MuiInput", ["root", "underline", "input"])
};
function getOutlinedInputUtilityClass(slot) {
  return generateUtilityClass("MuiOutlinedInput", slot);
}
const outlinedInputClasses = {
  ...inputBaseClasses,
  ...generateUtilityClasses("MuiOutlinedInput", ["root", "notchedOutline", "input"])
};
function getFilledInputUtilityClass(slot) {
  return generateUtilityClass("MuiFilledInput", slot);
}
const filledInputClasses = {
  ...inputBaseClasses,
  ...generateUtilityClasses("MuiFilledInput", ["root", "underline", "input", "adornedStart", "adornedEnd", "sizeSmall", "multiline", "hiddenLabel"])
};
const ArrowDropDownIcon = createSvgIcon(/* @__PURE__ */ jsxRuntimeExports.jsx("path", {
  d: "M7 10l5 5 5-5z"
}));
const styles = {
  entering: {
    opacity: 1
  },
  entered: {
    opacity: 1
  }
};
const Fade = /* @__PURE__ */ reactExports.forwardRef(function Fade2(props, ref) {
  const theme = useTheme();
  const defaultTimeout = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen
  };
  const {
    addEndListener,
    appear = true,
    children,
    easing,
    in: inProp,
    onEnter,
    onEntered,
    onEntering,
    onExit,
    onExited,
    onExiting,
    style,
    timeout = defaultTimeout,
    // eslint-disable-next-line react/prop-types
    TransitionComponent = Transition,
    ...other
  } = props;
  const nodeRef = reactExports.useRef(null);
  const handleRef = useForkRef(nodeRef, getReactElementRef(children), ref);
  const normalizedTransitionCallback = (callback) => (maybeIsAppearing) => {
    if (callback) {
      const node = nodeRef.current;
      if (maybeIsAppearing === void 0) {
        callback(node);
      } else {
        callback(node, maybeIsAppearing);
      }
    }
  };
  const handleEntering = normalizedTransitionCallback(onEntering);
  const handleEnter = normalizedTransitionCallback((node, isAppearing) => {
    reflow(node);
    const transitionProps = getTransitionProps({
      style,
      timeout,
      easing
    }, {
      mode: "enter"
    });
    node.style.webkitTransition = theme.transitions.create("opacity", transitionProps);
    node.style.transition = theme.transitions.create("opacity", transitionProps);
    if (onEnter) {
      onEnter(node, isAppearing);
    }
  });
  const handleEntered = normalizedTransitionCallback(onEntered);
  const handleExiting = normalizedTransitionCallback(onExiting);
  const handleExit = normalizedTransitionCallback((node) => {
    const transitionProps = getTransitionProps({
      style,
      timeout,
      easing
    }, {
      mode: "exit"
    });
    node.style.webkitTransition = theme.transitions.create("opacity", transitionProps);
    node.style.transition = theme.transitions.create("opacity", transitionProps);
    if (onExit) {
      onExit(node);
    }
  });
  const handleExited = normalizedTransitionCallback(onExited);
  const handleAddEndListener = (next) => {
    if (addEndListener) {
      addEndListener(nodeRef.current, next);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(TransitionComponent, {
    appear,
    in: inProp,
    nodeRef,
    onEnter: handleEnter,
    onEntered: handleEntered,
    onEntering: handleEntering,
    onExit: handleExit,
    onExited: handleExited,
    onExiting: handleExiting,
    addEndListener: handleAddEndListener,
    timeout,
    ...other,
    children: (state, {
      ownerState,
      ...restChildProps
    }) => {
      return /* @__PURE__ */ reactExports.cloneElement(children, {
        style: {
          opacity: 0,
          visibility: state === "exited" && !inProp ? "hidden" : void 0,
          ...styles[state],
          ...style,
          ...children.props.style
        },
        ref: handleRef,
        ...restChildProps
      });
    }
  });
});
function getBackdropUtilityClass(slot) {
  return generateUtilityClass("MuiBackdrop", slot);
}
generateUtilityClasses("MuiBackdrop", ["root", "invisible"]);
const useUtilityClasses$f = (ownerState) => {
  const {
    classes,
    invisible
  } = ownerState;
  const slots = {
    root: ["root", invisible && "invisible"]
  };
  return composeClasses(slots, getBackdropUtilityClass, classes);
};
const BackdropRoot = styled("div", {
  name: "MuiBackdrop",
  slot: "Root",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.root, ownerState.invisible && styles2.invisible];
  }
})({
  position: "fixed",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  right: 0,
  bottom: 0,
  top: 0,
  left: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  WebkitTapHighlightColor: "transparent",
  variants: [{
    props: {
      invisible: true
    },
    style: {
      backgroundColor: "transparent"
    }
  }]
});
const Backdrop = /* @__PURE__ */ reactExports.forwardRef(function Backdrop2(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: "MuiBackdrop"
  });
  const {
    children,
    className,
    component = "div",
    invisible = false,
    open,
    components = {},
    componentsProps = {},
    slotProps = {},
    slots = {},
    TransitionComponent: TransitionComponentProp,
    transitionDuration,
    ...other
  } = props;
  const ownerState = {
    ...props,
    component,
    invisible
  };
  const classes = useUtilityClasses$f(ownerState);
  const backwardCompatibleSlots = {
    transition: TransitionComponentProp,
    root: components.Root,
    ...slots
  };
  const backwardCompatibleSlotProps = {
    ...componentsProps,
    ...slotProps
  };
  const externalForwardedProps = {
    component,
    slots: backwardCompatibleSlots,
    slotProps: backwardCompatibleSlotProps
  };
  const [RootSlot, rootProps] = useSlot("root", {
    elementType: BackdropRoot,
    externalForwardedProps,
    className: clsx(classes.root, className),
    ownerState
  });
  const [TransitionSlot, transitionProps] = useSlot("transition", {
    elementType: Fade,
    externalForwardedProps,
    ownerState
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(TransitionSlot, {
    in: open,
    timeout: transitionDuration,
    ...other,
    ...transitionProps,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(RootSlot, {
      "aria-hidden": true,
      ...rootProps,
      classes,
      ref,
      children
    })
  });
});
function getScrollbarSize(win = window) {
  const documentWidth = win.document.documentElement.clientWidth;
  return win.innerWidth - documentWidth;
}
function isOverflowing(container) {
  const doc = ownerDocument(container);
  if (doc.body === container) {
    return ownerWindow(container).innerWidth > doc.documentElement.clientWidth;
  }
  return container.scrollHeight > container.clientHeight;
}
function ariaHidden(element, hide) {
  if (hide) {
    element.setAttribute("aria-hidden", "true");
  } else {
    element.removeAttribute("aria-hidden");
  }
}
function getPaddingRight(element) {
  return parseInt(ownerWindow(element).getComputedStyle(element).paddingRight, 10) || 0;
}
function isAriaHiddenForbiddenOnElement(element) {
  const forbiddenTagNames = ["TEMPLATE", "SCRIPT", "STYLE", "LINK", "MAP", "META", "NOSCRIPT", "PICTURE", "COL", "COLGROUP", "PARAM", "SLOT", "SOURCE", "TRACK"];
  const isForbiddenTagName = forbiddenTagNames.includes(element.tagName);
  const isInputHidden = element.tagName === "INPUT" && element.getAttribute("type") === "hidden";
  return isForbiddenTagName || isInputHidden;
}
function ariaHiddenSiblings(container, mountElement, currentElement, elementsToExclude, hide) {
  const blacklist = [mountElement, currentElement, ...elementsToExclude];
  [].forEach.call(container.children, (element) => {
    const isNotExcludedElement = !blacklist.includes(element);
    const isNotForbiddenElement = !isAriaHiddenForbiddenOnElement(element);
    if (isNotExcludedElement && isNotForbiddenElement) {
      ariaHidden(element, hide);
    }
  });
}
function findIndexOf(items, callback) {
  let idx = -1;
  items.some((item, index) => {
    if (callback(item)) {
      idx = index;
      return true;
    }
    return false;
  });
  return idx;
}
function handleContainer(containerInfo, props) {
  const restoreStyle = [];
  const container = containerInfo.container;
  if (!props.disableScrollLock) {
    if (isOverflowing(container)) {
      const scrollbarSize = getScrollbarSize(ownerWindow(container));
      restoreStyle.push({
        value: container.style.paddingRight,
        property: "padding-right",
        el: container
      });
      container.style.paddingRight = `${getPaddingRight(container) + scrollbarSize}px`;
      const fixedElements = ownerDocument(container).querySelectorAll(".mui-fixed");
      [].forEach.call(fixedElements, (element) => {
        restoreStyle.push({
          value: element.style.paddingRight,
          property: "padding-right",
          el: element
        });
        element.style.paddingRight = `${getPaddingRight(element) + scrollbarSize}px`;
      });
    }
    let scrollContainer;
    if (container.parentNode instanceof DocumentFragment) {
      scrollContainer = ownerDocument(container).body;
    } else {
      const parent = container.parentElement;
      const containerWindow = ownerWindow(container);
      scrollContainer = parent?.nodeName === "HTML" && containerWindow.getComputedStyle(parent).overflowY === "scroll" ? parent : container;
    }
    restoreStyle.push({
      value: scrollContainer.style.overflow,
      property: "overflow",
      el: scrollContainer
    }, {
      value: scrollContainer.style.overflowX,
      property: "overflow-x",
      el: scrollContainer
    }, {
      value: scrollContainer.style.overflowY,
      property: "overflow-y",
      el: scrollContainer
    });
    scrollContainer.style.overflow = "hidden";
  }
  const restore = () => {
    restoreStyle.forEach(({
      value,
      el,
      property
    }) => {
      if (value) {
        el.style.setProperty(property, value);
      } else {
        el.style.removeProperty(property);
      }
    });
  };
  return restore;
}
function getHiddenSiblings(container) {
  const hiddenSiblings = [];
  [].forEach.call(container.children, (element) => {
    if (element.getAttribute("aria-hidden") === "true") {
      hiddenSiblings.push(element);
    }
  });
  return hiddenSiblings;
}
class ModalManager {
  constructor() {
    this.modals = [];
    this.containers = [];
  }
  add(modal, container) {
    let modalIndex = this.modals.indexOf(modal);
    if (modalIndex !== -1) {
      return modalIndex;
    }
    modalIndex = this.modals.length;
    this.modals.push(modal);
    if (modal.modalRef) {
      ariaHidden(modal.modalRef, false);
    }
    const hiddenSiblings = getHiddenSiblings(container);
    ariaHiddenSiblings(container, modal.mount, modal.modalRef, hiddenSiblings, true);
    const containerIndex = findIndexOf(this.containers, (item) => item.container === container);
    if (containerIndex !== -1) {
      this.containers[containerIndex].modals.push(modal);
      return modalIndex;
    }
    this.containers.push({
      modals: [modal],
      container,
      restore: null,
      hiddenSiblings
    });
    return modalIndex;
  }
  mount(modal, props) {
    const containerIndex = findIndexOf(this.containers, (item) => item.modals.includes(modal));
    const containerInfo = this.containers[containerIndex];
    if (!containerInfo.restore) {
      containerInfo.restore = handleContainer(containerInfo, props);
    }
  }
  remove(modal, ariaHiddenState = true) {
    const modalIndex = this.modals.indexOf(modal);
    if (modalIndex === -1) {
      return modalIndex;
    }
    const containerIndex = findIndexOf(this.containers, (item) => item.modals.includes(modal));
    const containerInfo = this.containers[containerIndex];
    containerInfo.modals.splice(containerInfo.modals.indexOf(modal), 1);
    this.modals.splice(modalIndex, 1);
    if (containerInfo.modals.length === 0) {
      if (containerInfo.restore) {
        containerInfo.restore();
      }
      if (modal.modalRef) {
        ariaHidden(modal.modalRef, ariaHiddenState);
      }
      ariaHiddenSiblings(containerInfo.container, modal.mount, modal.modalRef, containerInfo.hiddenSiblings, false);
      this.containers.splice(containerIndex, 1);
    } else {
      const nextTop = containerInfo.modals[containerInfo.modals.length - 1];
      if (nextTop.modalRef) {
        ariaHidden(nextTop.modalRef, false);
      }
    }
    return modalIndex;
  }
  isTopModal(modal) {
    return this.modals.length > 0 && this.modals[this.modals.length - 1] === modal;
  }
}
const candidatesSelector = ["input", "select", "textarea", "a[href]", "button", "[tabindex]", "audio[controls]", "video[controls]", '[contenteditable]:not([contenteditable="false"])'].join(",");
function getTabIndex(node) {
  const tabindexAttr = parseInt(node.getAttribute("tabindex") || "", 10);
  if (!Number.isNaN(tabindexAttr)) {
    return tabindexAttr;
  }
  if (node.contentEditable === "true" || (node.nodeName === "AUDIO" || node.nodeName === "VIDEO" || node.nodeName === "DETAILS") && node.getAttribute("tabindex") === null) {
    return 0;
  }
  return node.tabIndex;
}
function isNonTabbableRadio(node) {
  if (node.tagName !== "INPUT" || node.type !== "radio") {
    return false;
  }
  if (!node.name) {
    return false;
  }
  const getRadio = (selector) => node.ownerDocument.querySelector(`input[type="radio"]${selector}`);
  let roving = getRadio(`[name="${node.name}"]:checked`);
  if (!roving) {
    roving = getRadio(`[name="${node.name}"]`);
  }
  return roving !== node;
}
function isNodeMatchingSelectorFocusable(node) {
  if (node.disabled || node.tagName === "INPUT" && node.type === "hidden" || isNonTabbableRadio(node)) {
    return false;
  }
  return true;
}
function defaultGetTabbable(root) {
  const regularTabNodes = [];
  const orderedTabNodes = [];
  Array.from(root.querySelectorAll(candidatesSelector)).forEach((node, i) => {
    const nodeTabIndex = getTabIndex(node);
    if (nodeTabIndex === -1 || !isNodeMatchingSelectorFocusable(node)) {
      return;
    }
    if (nodeTabIndex === 0) {
      regularTabNodes.push(node);
    } else {
      orderedTabNodes.push({
        documentOrder: i,
        tabIndex: nodeTabIndex,
        node
      });
    }
  });
  return orderedTabNodes.sort((a, b) => a.tabIndex === b.tabIndex ? a.documentOrder - b.documentOrder : a.tabIndex - b.tabIndex).map((a) => a.node).concat(regularTabNodes);
}
function defaultIsEnabled() {
  return true;
}
function FocusTrap(props) {
  const {
    children,
    disableAutoFocus = false,
    disableEnforceFocus = false,
    disableRestoreFocus = false,
    getTabbable = defaultGetTabbable,
    isEnabled = defaultIsEnabled,
    open
  } = props;
  const ignoreNextEnforceFocus = reactExports.useRef(false);
  const sentinelStart = reactExports.useRef(null);
  const sentinelEnd = reactExports.useRef(null);
  const nodeToRestore = reactExports.useRef(null);
  const reactFocusEventTarget = reactExports.useRef(null);
  const activated = reactExports.useRef(false);
  const rootRef = reactExports.useRef(null);
  const handleRef = useForkRef(getReactElementRef(children), rootRef);
  const lastKeydown = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (!open || !rootRef.current) {
      return;
    }
    activated.current = !disableAutoFocus;
  }, [disableAutoFocus, open]);
  reactExports.useEffect(() => {
    if (!open || !rootRef.current) {
      return;
    }
    const doc = ownerDocument(rootRef.current);
    if (!rootRef.current.contains(doc.activeElement)) {
      if (!rootRef.current.hasAttribute("tabIndex")) {
        rootRef.current.setAttribute("tabIndex", "-1");
      }
      if (activated.current) {
        rootRef.current.focus();
      }
    }
    return () => {
      if (!disableRestoreFocus) {
        if (nodeToRestore.current && nodeToRestore.current.focus) {
          ignoreNextEnforceFocus.current = true;
          nodeToRestore.current.focus();
        }
        nodeToRestore.current = null;
      }
    };
  }, [open]);
  reactExports.useEffect(() => {
    if (!open || !rootRef.current) {
      return;
    }
    const doc = ownerDocument(rootRef.current);
    const loopFocus = (nativeEvent) => {
      lastKeydown.current = nativeEvent;
      if (disableEnforceFocus || !isEnabled() || nativeEvent.key !== "Tab") {
        return;
      }
      if (doc.activeElement === rootRef.current && nativeEvent.shiftKey) {
        ignoreNextEnforceFocus.current = true;
        if (sentinelEnd.current) {
          sentinelEnd.current.focus();
        }
      }
    };
    const contain = () => {
      const rootElement = rootRef.current;
      if (rootElement === null) {
        return;
      }
      if (!doc.hasFocus() || !isEnabled() || ignoreNextEnforceFocus.current) {
        ignoreNextEnforceFocus.current = false;
        return;
      }
      if (rootElement.contains(doc.activeElement)) {
        return;
      }
      if (disableEnforceFocus && doc.activeElement !== sentinelStart.current && doc.activeElement !== sentinelEnd.current) {
        return;
      }
      if (doc.activeElement !== reactFocusEventTarget.current) {
        reactFocusEventTarget.current = null;
      } else if (reactFocusEventTarget.current !== null) {
        return;
      }
      if (!activated.current) {
        return;
      }
      let tabbable = [];
      if (doc.activeElement === sentinelStart.current || doc.activeElement === sentinelEnd.current) {
        tabbable = getTabbable(rootRef.current);
      }
      if (tabbable.length > 0) {
        const isShiftTab = Boolean(lastKeydown.current?.shiftKey && lastKeydown.current?.key === "Tab");
        const focusNext = tabbable[0];
        const focusPrevious = tabbable[tabbable.length - 1];
        if (typeof focusNext !== "string" && typeof focusPrevious !== "string") {
          if (isShiftTab) {
            focusPrevious.focus();
          } else {
            focusNext.focus();
          }
        }
      } else {
        rootElement.focus();
      }
    };
    doc.addEventListener("focusin", contain);
    doc.addEventListener("keydown", loopFocus, true);
    const interval = setInterval(() => {
      if (doc.activeElement && doc.activeElement.tagName === "BODY") {
        contain();
      }
    }, 50);
    return () => {
      clearInterval(interval);
      doc.removeEventListener("focusin", contain);
      doc.removeEventListener("keydown", loopFocus, true);
    };
  }, [disableAutoFocus, disableEnforceFocus, disableRestoreFocus, isEnabled, open, getTabbable]);
  const onFocus = (event) => {
    if (nodeToRestore.current === null) {
      nodeToRestore.current = event.relatedTarget;
    }
    activated.current = true;
    reactFocusEventTarget.current = event.target;
    const childrenPropsHandler = children.props.onFocus;
    if (childrenPropsHandler) {
      childrenPropsHandler(event);
    }
  };
  const handleFocusSentinel = (event) => {
    if (nodeToRestore.current === null) {
      nodeToRestore.current = event.relatedTarget;
    }
    activated.current = true;
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(reactExports.Fragment, {
    children: [/* @__PURE__ */ jsxRuntimeExports.jsx("div", {
      tabIndex: open ? 0 : -1,
      onFocus: handleFocusSentinel,
      ref: sentinelStart,
      "data-testid": "sentinelStart"
    }), /* @__PURE__ */ reactExports.cloneElement(children, {
      ref: handleRef,
      onFocus
    }), /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
      tabIndex: open ? 0 : -1,
      onFocus: handleFocusSentinel,
      ref: sentinelEnd,
      "data-testid": "sentinelEnd"
    })]
  });
}
function getContainer(container) {
  return typeof container === "function" ? container() : container;
}
function getHasTransition(children) {
  return children ? children.props.hasOwnProperty("in") : false;
}
const noop = () => {
};
const manager = new ModalManager();
function useModal(parameters) {
  const {
    container,
    disableEscapeKeyDown = false,
    disableScrollLock = false,
    closeAfterTransition = false,
    onTransitionEnter,
    onTransitionExited,
    children,
    onClose,
    open,
    rootRef
  } = parameters;
  const modal = reactExports.useRef({});
  const mountNodeRef = reactExports.useRef(null);
  const modalRef = reactExports.useRef(null);
  const handleRef = useForkRef(modalRef, rootRef);
  const [exited, setExited] = reactExports.useState(!open);
  const hasTransition = getHasTransition(children);
  let ariaHiddenProp = true;
  if (parameters["aria-hidden"] === "false" || parameters["aria-hidden"] === false) {
    ariaHiddenProp = false;
  }
  const getDoc = () => ownerDocument(mountNodeRef.current);
  const getModal = () => {
    modal.current.modalRef = modalRef.current;
    modal.current.mount = mountNodeRef.current;
    return modal.current;
  };
  const handleMounted = () => {
    manager.mount(getModal(), {
      disableScrollLock
    });
    if (modalRef.current) {
      modalRef.current.scrollTop = 0;
    }
  };
  const handleOpen = useEventCallback(() => {
    const resolvedContainer = getContainer(container) || getDoc().body;
    manager.add(getModal(), resolvedContainer);
    if (modalRef.current) {
      handleMounted();
    }
  });
  const isTopModal = () => manager.isTopModal(getModal());
  const handlePortalRef = useEventCallback((node) => {
    mountNodeRef.current = node;
    if (!node) {
      return;
    }
    if (open && isTopModal()) {
      handleMounted();
    } else if (modalRef.current) {
      ariaHidden(modalRef.current, ariaHiddenProp);
    }
  });
  const handleClose = reactExports.useCallback(() => {
    manager.remove(getModal(), ariaHiddenProp);
  }, [ariaHiddenProp]);
  reactExports.useEffect(() => {
    return () => {
      handleClose();
    };
  }, [handleClose]);
  reactExports.useEffect(() => {
    if (open) {
      handleOpen();
    } else if (!hasTransition || !closeAfterTransition) {
      handleClose();
    }
  }, [open, handleClose, hasTransition, closeAfterTransition, handleOpen]);
  const createHandleKeyDown = (otherHandlers) => (event) => {
    otherHandlers.onKeyDown?.(event);
    if (event.key !== "Escape" || event.which === 229 || // Wait until IME is settled.
    !isTopModal()) {
      return;
    }
    if (!disableEscapeKeyDown) {
      event.stopPropagation();
      if (onClose) {
        onClose(event, "escapeKeyDown");
      }
    }
  };
  const createHandleBackdropClick = (otherHandlers) => (event) => {
    otherHandlers.onClick?.(event);
    if (event.target !== event.currentTarget) {
      return;
    }
    if (onClose) {
      onClose(event, "backdropClick");
    }
  };
  const getRootProps = (otherHandlers = {}) => {
    const propsEventHandlers = extractEventHandlers(parameters);
    delete propsEventHandlers.onTransitionEnter;
    delete propsEventHandlers.onTransitionExited;
    const externalEventHandlers = {
      ...propsEventHandlers,
      ...otherHandlers
    };
    return {
      /*
       * Marking an element with the role presentation indicates to assistive technology
       * that this element should be ignored; it exists to support the web application and
       * is not meant for humans to interact with directly.
       * https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-static-element-interactions.md
       */
      role: "presentation",
      ...externalEventHandlers,
      onKeyDown: createHandleKeyDown(externalEventHandlers),
      ref: handleRef
    };
  };
  const getBackdropProps = (otherHandlers = {}) => {
    const externalEventHandlers = otherHandlers;
    return {
      "aria-hidden": true,
      ...externalEventHandlers,
      onClick: createHandleBackdropClick(externalEventHandlers),
      open
    };
  };
  const getTransitionProps2 = () => {
    const handleEnter = () => {
      setExited(false);
      if (onTransitionEnter) {
        onTransitionEnter();
      }
    };
    const handleExited = () => {
      setExited(true);
      if (onTransitionExited) {
        onTransitionExited();
      }
      if (closeAfterTransition) {
        handleClose();
      }
    };
    return {
      onEnter: createChainedFunction(handleEnter, children?.props.onEnter ?? noop),
      onExited: createChainedFunction(handleExited, children?.props.onExited ?? noop)
    };
  };
  return {
    getRootProps,
    getBackdropProps,
    getTransitionProps: getTransitionProps2,
    rootRef: handleRef,
    portalRef: handlePortalRef,
    isTopModal,
    exited,
    hasTransition
  };
}
function getModalUtilityClass(slot) {
  return generateUtilityClass("MuiModal", slot);
}
generateUtilityClasses("MuiModal", ["root", "hidden", "backdrop"]);
const useUtilityClasses$e = (ownerState) => {
  const {
    open,
    exited,
    classes
  } = ownerState;
  const slots = {
    root: ["root", !open && exited && "hidden"],
    backdrop: ["backdrop"]
  };
  return composeClasses(slots, getModalUtilityClass, classes);
};
const ModalRoot = styled("div", {
  name: "MuiModal",
  slot: "Root",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.root, !ownerState.open && ownerState.exited && styles2.hidden];
  }
})(memoTheme(({
  theme
}) => ({
  position: "fixed",
  zIndex: (theme.vars || theme).zIndex.modal,
  right: 0,
  bottom: 0,
  top: 0,
  left: 0,
  variants: [{
    props: ({
      ownerState
    }) => !ownerState.open && ownerState.exited,
    style: {
      visibility: "hidden"
    }
  }]
})));
const ModalBackdrop = styled(Backdrop, {
  name: "MuiModal",
  slot: "Backdrop"
})({
  zIndex: -1
});
const Modal = /* @__PURE__ */ reactExports.forwardRef(function Modal2(inProps, ref) {
  const props = useDefaultProps({
    name: "MuiModal",
    props: inProps
  });
  const {
    BackdropComponent = ModalBackdrop,
    BackdropProps,
    classes: classesProp,
    className,
    closeAfterTransition = false,
    children,
    container,
    component,
    components = {},
    componentsProps = {},
    disableAutoFocus = false,
    disableEnforceFocus = false,
    disableEscapeKeyDown = false,
    disablePortal = false,
    disableRestoreFocus = false,
    disableScrollLock = false,
    hideBackdrop = false,
    keepMounted = false,
    onClose,
    onTransitionEnter,
    onTransitionExited,
    open,
    slotProps = {},
    slots = {},
    // eslint-disable-next-line react/prop-types
    theme,
    ...other
  } = props;
  const propsWithDefaults = {
    ...props,
    closeAfterTransition,
    disableAutoFocus,
    disableEnforceFocus,
    disableEscapeKeyDown,
    disablePortal,
    disableRestoreFocus,
    disableScrollLock,
    hideBackdrop,
    keepMounted
  };
  const {
    getRootProps,
    getBackdropProps,
    getTransitionProps: getTransitionProps2,
    portalRef,
    isTopModal,
    exited,
    hasTransition
  } = useModal({
    ...propsWithDefaults,
    rootRef: ref
  });
  const ownerState = {
    ...propsWithDefaults,
    exited
  };
  const classes = useUtilityClasses$e(ownerState);
  const childProps = {};
  if (children.props.tabIndex === void 0) {
    childProps.tabIndex = "-1";
  }
  if (hasTransition) {
    const {
      onEnter,
      onExited
    } = getTransitionProps2();
    childProps.onEnter = onEnter;
    childProps.onExited = onExited;
  }
  const externalForwardedProps = {
    slots: {
      root: components.Root,
      backdrop: components.Backdrop,
      ...slots
    },
    slotProps: {
      ...componentsProps,
      ...slotProps
    }
  };
  const [RootSlot, rootProps] = useSlot("root", {
    ref,
    elementType: ModalRoot,
    externalForwardedProps: {
      ...externalForwardedProps,
      ...other,
      component
    },
    getSlotProps: getRootProps,
    ownerState,
    className: clsx(className, classes?.root, !ownerState.open && ownerState.exited && classes?.hidden)
  });
  const [BackdropSlot, backdropProps] = useSlot("backdrop", {
    ref: BackdropProps?.ref,
    elementType: BackdropComponent,
    externalForwardedProps,
    shouldForwardComponentProp: true,
    additionalProps: BackdropProps,
    getSlotProps: (otherHandlers) => {
      return getBackdropProps({
        ...otherHandlers,
        onClick: (event) => {
          if (otherHandlers?.onClick) {
            otherHandlers.onClick(event);
          }
        }
      });
    },
    className: clsx(BackdropProps?.className, classes?.backdrop),
    ownerState
  });
  if (!keepMounted && !open && (!hasTransition || exited)) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, {
    ref: portalRef,
    container,
    disablePortal,
    children: /* @__PURE__ */ jsxRuntimeExports.jsxs(RootSlot, {
      ...rootProps,
      children: [!hideBackdrop && BackdropComponent ? /* @__PURE__ */ jsxRuntimeExports.jsx(BackdropSlot, {
        ...backdropProps
      }) : null, /* @__PURE__ */ jsxRuntimeExports.jsx(FocusTrap, {
        disableEnforceFocus,
        disableAutoFocus,
        disableRestoreFocus,
        isEnabled: isTopModal,
        open,
        children: /* @__PURE__ */ reactExports.cloneElement(children, childProps)
      })]
    })
  });
});
const useUtilityClasses$d = (ownerState) => {
  const {
    classes,
    disableUnderline,
    startAdornment,
    endAdornment,
    size,
    hiddenLabel,
    multiline
  } = ownerState;
  const slots = {
    root: ["root", !disableUnderline && "underline", startAdornment && "adornedStart", endAdornment && "adornedEnd", size === "small" && `size${capitalize(size)}`, hiddenLabel && "hiddenLabel", multiline && "multiline"],
    input: ["input"]
  };
  const composedClasses = composeClasses(slots, getFilledInputUtilityClass, classes);
  return {
    ...classes,
    // forward classes to the InputBase
    ...composedClasses
  };
};
const FilledInputRoot = styled(InputBaseRoot, {
  shouldForwardProp: (prop) => rootShouldForwardProp(prop) || prop === "classes",
  name: "MuiFilledInput",
  slot: "Root",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [...rootOverridesResolver(props, styles2), !ownerState.disableUnderline && styles2.underline];
  }
})(memoTheme(({
  theme
}) => {
  const light = theme.palette.mode === "light";
  const bottomLineColor = light ? "rgba(0, 0, 0, 0.42)" : "rgba(255, 255, 255, 0.7)";
  const backgroundColor = light ? "rgba(0, 0, 0, 0.06)" : "rgba(255, 255, 255, 0.09)";
  const hoverBackground = light ? "rgba(0, 0, 0, 0.09)" : "rgba(255, 255, 255, 0.13)";
  const disabledBackground = light ? "rgba(0, 0, 0, 0.12)" : "rgba(255, 255, 255, 0.12)";
  return {
    position: "relative",
    backgroundColor: theme.vars ? theme.vars.palette.FilledInput.bg : backgroundColor,
    borderTopLeftRadius: (theme.vars || theme).shape.borderRadius,
    borderTopRightRadius: (theme.vars || theme).shape.borderRadius,
    transition: theme.transitions.create("background-color", {
      duration: theme.transitions.duration.shorter,
      easing: theme.transitions.easing.easeOut
    }),
    "&:hover": {
      backgroundColor: theme.vars ? theme.vars.palette.FilledInput.hoverBg : hoverBackground,
      // Reset on touch devices, it doesn't add specificity
      "@media (hover: none)": {
        backgroundColor: theme.vars ? theme.vars.palette.FilledInput.bg : backgroundColor
      }
    },
    [`&.${filledInputClasses.focused}`]: {
      backgroundColor: theme.vars ? theme.vars.palette.FilledInput.bg : backgroundColor
    },
    [`&.${filledInputClasses.disabled}`]: {
      backgroundColor: theme.vars ? theme.vars.palette.FilledInput.disabledBg : disabledBackground
    },
    variants: [{
      props: ({
        ownerState
      }) => !ownerState.disableUnderline,
      style: {
        "&::after": {
          left: 0,
          bottom: 0,
          content: '""',
          position: "absolute",
          right: 0,
          transform: "scaleX(0)",
          transition: theme.transitions.create("transform", {
            duration: theme.transitions.duration.shorter,
            easing: theme.transitions.easing.easeOut
          }),
          pointerEvents: "none"
          // Transparent to the hover style.
        },
        [`&.${filledInputClasses.focused}:after`]: {
          // translateX(0) is a workaround for Safari transform scale bug
          // See https://github.com/mui/material-ui/issues/31766
          transform: "scaleX(1) translateX(0)"
        },
        [`&.${filledInputClasses.error}`]: {
          "&::before, &::after": {
            borderBottomColor: (theme.vars || theme).palette.error.main
          }
        },
        "&::before": {
          borderBottom: `1px solid ${theme.vars ? `rgba(${theme.vars.palette.common.onBackgroundChannel} / ${theme.vars.opacity.inputUnderline})` : bottomLineColor}`,
          left: 0,
          bottom: 0,
          content: '"\\00a0"',
          position: "absolute",
          right: 0,
          transition: theme.transitions.create("border-bottom-color", {
            duration: theme.transitions.duration.shorter
          }),
          pointerEvents: "none"
          // Transparent to the hover style.
        },
        [`&:hover:not(.${filledInputClasses.disabled}, .${filledInputClasses.error}):before`]: {
          borderBottom: `1px solid ${(theme.vars || theme).palette.text.primary}`
        },
        [`&.${filledInputClasses.disabled}:before`]: {
          borderBottomStyle: "dotted"
        }
      }
    }, ...Object.entries(theme.palette).filter(createSimplePaletteValueFilter()).map(([color]) => ({
      props: {
        disableUnderline: false,
        color
      },
      style: {
        "&::after": {
          borderBottom: `2px solid ${(theme.vars || theme).palette[color]?.main}`
        }
      }
    })), {
      props: ({
        ownerState
      }) => ownerState.startAdornment,
      style: {
        paddingLeft: 12
      }
    }, {
      props: ({
        ownerState
      }) => ownerState.endAdornment,
      style: {
        paddingRight: 12
      }
    }, {
      props: ({
        ownerState
      }) => ownerState.multiline,
      style: {
        padding: "25px 12px 8px"
      }
    }, {
      props: ({
        ownerState,
        size
      }) => ownerState.multiline && size === "small",
      style: {
        paddingTop: 21,
        paddingBottom: 4
      }
    }, {
      props: ({
        ownerState
      }) => ownerState.multiline && ownerState.hiddenLabel,
      style: {
        paddingTop: 16,
        paddingBottom: 17
      }
    }, {
      props: ({
        ownerState
      }) => ownerState.multiline && ownerState.hiddenLabel && ownerState.size === "small",
      style: {
        paddingTop: 8,
        paddingBottom: 9
      }
    }]
  };
}));
const FilledInputInput = styled(InputBaseInput, {
  name: "MuiFilledInput",
  slot: "Input",
  overridesResolver: inputOverridesResolver
})(memoTheme(({
  theme
}) => ({
  paddingTop: 25,
  paddingRight: 12,
  paddingBottom: 8,
  paddingLeft: 12,
  ...!theme.vars && {
    "&:-webkit-autofill": {
      WebkitBoxShadow: theme.palette.mode === "light" ? null : "0 0 0 100px #266798 inset",
      WebkitTextFillColor: theme.palette.mode === "light" ? null : "#fff",
      caretColor: theme.palette.mode === "light" ? null : "#fff",
      borderTopLeftRadius: "inherit",
      borderTopRightRadius: "inherit"
    }
  },
  ...theme.vars && {
    "&:-webkit-autofill": {
      borderTopLeftRadius: "inherit",
      borderTopRightRadius: "inherit"
    },
    [theme.getColorSchemeSelector("dark")]: {
      "&:-webkit-autofill": {
        WebkitBoxShadow: "0 0 0 100px #266798 inset",
        WebkitTextFillColor: "#fff",
        caretColor: "#fff"
      }
    }
  },
  variants: [{
    props: {
      size: "small"
    },
    style: {
      paddingTop: 21,
      paddingBottom: 4
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.hiddenLabel,
    style: {
      paddingTop: 16,
      paddingBottom: 17
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.startAdornment,
    style: {
      paddingLeft: 0
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.endAdornment,
    style: {
      paddingRight: 0
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.hiddenLabel && ownerState.size === "small",
    style: {
      paddingTop: 8,
      paddingBottom: 9
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.multiline,
    style: {
      paddingTop: 0,
      paddingBottom: 0,
      paddingLeft: 0,
      paddingRight: 0
    }
  }]
})));
const FilledInput = /* @__PURE__ */ reactExports.forwardRef(function FilledInput2(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: "MuiFilledInput"
  });
  const {
    disableUnderline = false,
    components = {},
    componentsProps: componentsPropsProp,
    fullWidth = false,
    hiddenLabel,
    // declare here to prevent spreading to DOM
    inputComponent = "input",
    multiline = false,
    slotProps,
    slots = {},
    type = "text",
    ...other
  } = props;
  const ownerState = {
    ...props,
    disableUnderline,
    fullWidth,
    inputComponent,
    multiline,
    type
  };
  const classes = useUtilityClasses$d(props);
  const filledInputComponentsProps = {
    root: {
      ownerState
    },
    input: {
      ownerState
    }
  };
  const componentsProps = slotProps ?? componentsPropsProp ? deepmerge(filledInputComponentsProps, slotProps ?? componentsPropsProp) : filledInputComponentsProps;
  const RootSlot = slots.root ?? components.Root ?? FilledInputRoot;
  const InputSlot = slots.input ?? components.Input ?? FilledInputInput;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(InputBase, {
    slots: {
      root: RootSlot,
      input: InputSlot
    },
    slotProps: componentsProps,
    fullWidth,
    inputComponent,
    multiline,
    ref,
    type,
    ...other,
    classes
  });
});
FilledInput.muiName = "Input";
function getFormControlUtilityClasses(slot) {
  return generateUtilityClass("MuiFormControl", slot);
}
generateUtilityClasses("MuiFormControl", ["root", "marginNone", "marginNormal", "marginDense", "fullWidth", "disabled"]);
const useUtilityClasses$c = (ownerState) => {
  const {
    classes,
    margin,
    fullWidth
  } = ownerState;
  const slots = {
    root: ["root", margin !== "none" && `margin${capitalize(margin)}`, fullWidth && "fullWidth"]
  };
  return composeClasses(slots, getFormControlUtilityClasses, classes);
};
const FormControlRoot = styled("div", {
  name: "MuiFormControl",
  slot: "Root",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.root, styles2[`margin${capitalize(ownerState.margin)}`], ownerState.fullWidth && styles2.fullWidth];
  }
})({
  display: "inline-flex",
  flexDirection: "column",
  position: "relative",
  // Reset fieldset default style.
  minWidth: 0,
  padding: 0,
  margin: 0,
  border: 0,
  verticalAlign: "top",
  // Fix alignment issue on Safari.
  variants: [{
    props: {
      margin: "normal"
    },
    style: {
      marginTop: 16,
      marginBottom: 8
    }
  }, {
    props: {
      margin: "dense"
    },
    style: {
      marginTop: 8,
      marginBottom: 4
    }
  }, {
    props: {
      fullWidth: true
    },
    style: {
      width: "100%"
    }
  }]
});
const FormControl = /* @__PURE__ */ reactExports.forwardRef(function FormControl2(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: "MuiFormControl"
  });
  const {
    children,
    className,
    color = "primary",
    component = "div",
    disabled = false,
    error = false,
    focused: visuallyFocused,
    fullWidth = false,
    hiddenLabel = false,
    margin = "none",
    required = false,
    size = "medium",
    variant = "outlined",
    ...other
  } = props;
  const ownerState = {
    ...props,
    color,
    component,
    disabled,
    error,
    fullWidth,
    hiddenLabel,
    margin,
    required,
    size,
    variant
  };
  const classes = useUtilityClasses$c(ownerState);
  const [adornedStart, setAdornedStart] = reactExports.useState(() => {
    let initialAdornedStart = false;
    if (children) {
      reactExports.Children.forEach(children, (child) => {
        if (!isMuiElement(child, ["Input", "Select"])) {
          return;
        }
        const input = isMuiElement(child, ["Select"]) ? child.props.input : child;
        if (input && isAdornedStart(input.props)) {
          initialAdornedStart = true;
        }
      });
    }
    return initialAdornedStart;
  });
  const [filled, setFilled] = reactExports.useState(() => {
    let initialFilled = false;
    if (children) {
      reactExports.Children.forEach(children, (child) => {
        if (!isMuiElement(child, ["Input", "Select"])) {
          return;
        }
        if (isFilled(child.props, true) || isFilled(child.props.inputProps, true)) {
          initialFilled = true;
        }
      });
    }
    return initialFilled;
  });
  const [focusedState, setFocused] = reactExports.useState(false);
  if (disabled && focusedState) {
    setFocused(false);
  }
  const focused = visuallyFocused !== void 0 && !disabled ? visuallyFocused : focusedState;
  let registerEffect;
  reactExports.useRef(false);
  const onFilled = reactExports.useCallback(() => {
    setFilled(true);
  }, []);
  const onEmpty = reactExports.useCallback(() => {
    setFilled(false);
  }, []);
  const childContext = reactExports.useMemo(() => {
    return {
      adornedStart,
      setAdornedStart,
      color,
      disabled,
      error,
      filled,
      focused,
      fullWidth,
      hiddenLabel,
      size,
      onBlur: () => {
        setFocused(false);
      },
      onFocus: () => {
        setFocused(true);
      },
      onEmpty,
      onFilled,
      registerEffect,
      required,
      variant
    };
  }, [adornedStart, color, disabled, error, filled, focused, fullWidth, hiddenLabel, registerEffect, onEmpty, onFilled, required, size, variant]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(FormControlContext.Provider, {
    value: childContext,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(FormControlRoot, {
      as: component,
      ownerState,
      className: clsx(classes.root, className),
      ref,
      ...other,
      children
    })
  });
});
function getFormHelperTextUtilityClasses(slot) {
  return generateUtilityClass("MuiFormHelperText", slot);
}
const formHelperTextClasses = generateUtilityClasses("MuiFormHelperText", ["root", "error", "disabled", "sizeSmall", "sizeMedium", "contained", "focused", "filled", "required"]);
var _span$2;
const useUtilityClasses$b = (ownerState) => {
  const {
    classes,
    contained,
    size,
    disabled,
    error,
    filled,
    focused,
    required
  } = ownerState;
  const slots = {
    root: ["root", disabled && "disabled", error && "error", size && `size${capitalize(size)}`, contained && "contained", focused && "focused", filled && "filled", required && "required"]
  };
  return composeClasses(slots, getFormHelperTextUtilityClasses, classes);
};
const FormHelperTextRoot = styled("p", {
  name: "MuiFormHelperText",
  slot: "Root",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.root, ownerState.size && styles2[`size${capitalize(ownerState.size)}`], ownerState.contained && styles2.contained, ownerState.filled && styles2.filled];
  }
})(memoTheme(({
  theme
}) => ({
  color: (theme.vars || theme).palette.text.secondary,
  ...theme.typography.caption,
  textAlign: "left",
  marginTop: 3,
  marginRight: 0,
  marginBottom: 0,
  marginLeft: 0,
  [`&.${formHelperTextClasses.disabled}`]: {
    color: (theme.vars || theme).palette.text.disabled
  },
  [`&.${formHelperTextClasses.error}`]: {
    color: (theme.vars || theme).palette.error.main
  },
  variants: [{
    props: {
      size: "small"
    },
    style: {
      marginTop: 4
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.contained,
    style: {
      marginLeft: 14,
      marginRight: 14
    }
  }]
})));
const FormHelperText = /* @__PURE__ */ reactExports.forwardRef(function FormHelperText2(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: "MuiFormHelperText"
  });
  const {
    children,
    className,
    component = "p",
    disabled,
    error,
    filled,
    focused,
    margin,
    required,
    variant,
    ...other
  } = props;
  const muiFormControl = useFormControl();
  const fcs = formControlState({
    props,
    muiFormControl,
    states: ["variant", "size", "disabled", "error", "filled", "focused", "required"]
  });
  const ownerState = {
    ...props,
    component,
    contained: fcs.variant === "filled" || fcs.variant === "outlined",
    variant: fcs.variant,
    size: fcs.size,
    disabled: fcs.disabled,
    error: fcs.error,
    filled: fcs.filled,
    focused: fcs.focused,
    required: fcs.required
  };
  delete ownerState.ownerState;
  const classes = useUtilityClasses$b(ownerState);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(FormHelperTextRoot, {
    as: component,
    className: clsx(classes.root, className),
    ref,
    ...other,
    ownerState,
    children: children === " " ? (
      // notranslate needed while Google Translate will not fix zero-width space issue
      _span$2 || (_span$2 = /* @__PURE__ */ jsxRuntimeExports.jsx("span", {
        className: "notranslate",
        "aria-hidden": true,
        children: "​"
      }))
    ) : children
  });
});
function getFormLabelUtilityClasses(slot) {
  return generateUtilityClass("MuiFormLabel", slot);
}
const formLabelClasses = generateUtilityClasses("MuiFormLabel", ["root", "colorSecondary", "focused", "disabled", "error", "filled", "required", "asterisk"]);
const useUtilityClasses$a = (ownerState) => {
  const {
    classes,
    color,
    focused,
    disabled,
    error,
    filled,
    required
  } = ownerState;
  const slots = {
    root: ["root", `color${capitalize(color)}`, disabled && "disabled", error && "error", filled && "filled", focused && "focused", required && "required"],
    asterisk: ["asterisk", error && "error"]
  };
  return composeClasses(slots, getFormLabelUtilityClasses, classes);
};
const FormLabelRoot = styled("label", {
  name: "MuiFormLabel",
  slot: "Root",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.root, ownerState.color === "secondary" && styles2.colorSecondary, ownerState.filled && styles2.filled];
  }
})(memoTheme(({
  theme
}) => ({
  color: (theme.vars || theme).palette.text.secondary,
  ...theme.typography.body1,
  lineHeight: "1.4375em",
  padding: 0,
  position: "relative",
  variants: [...Object.entries(theme.palette).filter(createSimplePaletteValueFilter()).map(([color]) => ({
    props: {
      color
    },
    style: {
      [`&.${formLabelClasses.focused}`]: {
        color: (theme.vars || theme).palette[color].main
      }
    }
  })), {
    props: {},
    style: {
      [`&.${formLabelClasses.disabled}`]: {
        color: (theme.vars || theme).palette.text.disabled
      },
      [`&.${formLabelClasses.error}`]: {
        color: (theme.vars || theme).palette.error.main
      }
    }
  }]
})));
const AsteriskComponent = styled("span", {
  name: "MuiFormLabel",
  slot: "Asterisk"
})(memoTheme(({
  theme
}) => ({
  [`&.${formLabelClasses.error}`]: {
    color: (theme.vars || theme).palette.error.main
  }
})));
const FormLabel = /* @__PURE__ */ reactExports.forwardRef(function FormLabel2(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: "MuiFormLabel"
  });
  const {
    children,
    className,
    color,
    component = "label",
    disabled,
    error,
    filled,
    focused,
    required,
    ...other
  } = props;
  const muiFormControl = useFormControl();
  const fcs = formControlState({
    props,
    muiFormControl,
    states: ["color", "required", "focused", "disabled", "error", "filled"]
  });
  const ownerState = {
    ...props,
    color: fcs.color || "primary",
    component,
    disabled: fcs.disabled,
    error: fcs.error,
    filled: fcs.filled,
    focused: fcs.focused,
    required: fcs.required
  };
  const classes = useUtilityClasses$a(ownerState);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(FormLabelRoot, {
    as: component,
    ownerState,
    className: clsx(classes.root, className),
    ref,
    ...other,
    children: [children, fcs.required && /* @__PURE__ */ jsxRuntimeExports.jsxs(AsteriskComponent, {
      ownerState,
      "aria-hidden": true,
      className: classes.asterisk,
      children: [" ", "*"]
    })]
  });
});
const useUtilityClasses$9 = (ownerState) => {
  const {
    classes,
    disableUnderline
  } = ownerState;
  const slots = {
    root: ["root", !disableUnderline && "underline"],
    input: ["input"]
  };
  const composedClasses = composeClasses(slots, getInputUtilityClass, classes);
  return {
    ...classes,
    // forward classes to the InputBase
    ...composedClasses
  };
};
const InputRoot = styled(InputBaseRoot, {
  shouldForwardProp: (prop) => rootShouldForwardProp(prop) || prop === "classes",
  name: "MuiInput",
  slot: "Root",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [...rootOverridesResolver(props, styles2), !ownerState.disableUnderline && styles2.underline];
  }
})(memoTheme(({
  theme
}) => {
  const light = theme.palette.mode === "light";
  let bottomLineColor = light ? "rgba(0, 0, 0, 0.42)" : "rgba(255, 255, 255, 0.7)";
  if (theme.vars) {
    bottomLineColor = `rgba(${theme.vars.palette.common.onBackgroundChannel} / ${theme.vars.opacity.inputUnderline})`;
  }
  return {
    position: "relative",
    variants: [{
      props: ({
        ownerState
      }) => ownerState.formControl,
      style: {
        "label + &": {
          marginTop: 16
        }
      }
    }, {
      props: ({
        ownerState
      }) => !ownerState.disableUnderline,
      style: {
        "&::after": {
          left: 0,
          bottom: 0,
          content: '""',
          position: "absolute",
          right: 0,
          transform: "scaleX(0)",
          transition: theme.transitions.create("transform", {
            duration: theme.transitions.duration.shorter,
            easing: theme.transitions.easing.easeOut
          }),
          pointerEvents: "none"
          // Transparent to the hover style.
        },
        [`&.${inputClasses.focused}:after`]: {
          // translateX(0) is a workaround for Safari transform scale bug
          // See https://github.com/mui/material-ui/issues/31766
          transform: "scaleX(1) translateX(0)"
        },
        [`&.${inputClasses.error}`]: {
          "&::before, &::after": {
            borderBottomColor: (theme.vars || theme).palette.error.main
          }
        },
        "&::before": {
          borderBottom: `1px solid ${bottomLineColor}`,
          left: 0,
          bottom: 0,
          content: '"\\00a0"',
          position: "absolute",
          right: 0,
          transition: theme.transitions.create("border-bottom-color", {
            duration: theme.transitions.duration.shorter
          }),
          pointerEvents: "none"
          // Transparent to the hover style.
        },
        [`&:hover:not(.${inputClasses.disabled}, .${inputClasses.error}):before`]: {
          borderBottom: `2px solid ${(theme.vars || theme).palette.text.primary}`,
          // Reset on touch devices, it doesn't add specificity
          "@media (hover: none)": {
            borderBottom: `1px solid ${bottomLineColor}`
          }
        },
        [`&.${inputClasses.disabled}:before`]: {
          borderBottomStyle: "dotted"
        }
      }
    }, ...Object.entries(theme.palette).filter(createSimplePaletteValueFilter()).map(([color]) => ({
      props: {
        color,
        disableUnderline: false
      },
      style: {
        "&::after": {
          borderBottom: `2px solid ${(theme.vars || theme).palette[color].main}`
        }
      }
    }))]
  };
}));
const InputInput = styled(InputBaseInput, {
  name: "MuiInput",
  slot: "Input",
  overridesResolver: inputOverridesResolver
})({});
const Input = /* @__PURE__ */ reactExports.forwardRef(function Input2(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: "MuiInput"
  });
  const {
    disableUnderline = false,
    components = {},
    componentsProps: componentsPropsProp,
    fullWidth = false,
    inputComponent = "input",
    multiline = false,
    slotProps,
    slots = {},
    type = "text",
    ...other
  } = props;
  const classes = useUtilityClasses$9(props);
  const ownerState = {
    disableUnderline
  };
  const inputComponentsProps = {
    root: {
      ownerState
    }
  };
  const componentsProps = slotProps ?? componentsPropsProp ? deepmerge(slotProps ?? componentsPropsProp, inputComponentsProps) : inputComponentsProps;
  const RootSlot = slots.root ?? components.Root ?? InputRoot;
  const InputSlot = slots.input ?? components.Input ?? InputInput;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(InputBase, {
    slots: {
      root: RootSlot,
      input: InputSlot
    },
    slotProps: componentsProps,
    fullWidth,
    inputComponent,
    multiline,
    ref,
    type,
    ...other,
    classes
  });
});
Input.muiName = "Input";
function getInputLabelUtilityClasses(slot) {
  return generateUtilityClass("MuiInputLabel", slot);
}
generateUtilityClasses("MuiInputLabel", ["root", "focused", "disabled", "error", "required", "asterisk", "formControl", "sizeSmall", "shrink", "animated", "standard", "filled", "outlined"]);
const useUtilityClasses$8 = (ownerState) => {
  const {
    classes,
    formControl,
    size,
    shrink,
    disableAnimation,
    variant,
    required
  } = ownerState;
  const slots = {
    root: ["root", formControl && "formControl", !disableAnimation && "animated", shrink && "shrink", size && size !== "medium" && `size${capitalize(size)}`, variant],
    asterisk: [required && "asterisk"]
  };
  const composedClasses = composeClasses(slots, getInputLabelUtilityClasses, classes);
  return {
    ...classes,
    // forward the focused, disabled, etc. classes to the FormLabel
    ...composedClasses
  };
};
const InputLabelRoot = styled(FormLabel, {
  shouldForwardProp: (prop) => rootShouldForwardProp(prop) || prop === "classes",
  name: "MuiInputLabel",
  slot: "Root",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [{
      [`& .${formLabelClasses.asterisk}`]: styles2.asterisk
    }, styles2.root, ownerState.formControl && styles2.formControl, ownerState.size === "small" && styles2.sizeSmall, ownerState.shrink && styles2.shrink, !ownerState.disableAnimation && styles2.animated, ownerState.focused && styles2.focused, styles2[ownerState.variant]];
  }
})(memoTheme(({
  theme
}) => ({
  display: "block",
  transformOrigin: "top left",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  maxWidth: "100%",
  variants: [{
    props: ({
      ownerState
    }) => ownerState.formControl,
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      // slight alteration to spec spacing to match visual spec result
      transform: "translate(0, 20px) scale(1)"
    }
  }, {
    props: {
      size: "small"
    },
    style: {
      // Compensation for the `Input.inputSizeSmall` style.
      transform: "translate(0, 17px) scale(1)"
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.shrink,
    style: {
      transform: "translate(0, -1.5px) scale(0.75)",
      transformOrigin: "top left",
      maxWidth: "133%"
    }
  }, {
    props: ({
      ownerState
    }) => !ownerState.disableAnimation,
    style: {
      transition: theme.transitions.create(["color", "transform", "max-width"], {
        duration: theme.transitions.duration.shorter,
        easing: theme.transitions.easing.easeOut
      })
    }
  }, {
    props: {
      variant: "filled"
    },
    style: {
      // Chrome's autofill feature gives the input field a yellow background.
      // Since the input field is behind the label in the HTML tree,
      // the input field is drawn last and hides the label with an opaque background color.
      // zIndex: 1 will raise the label above opaque background-colors of input.
      zIndex: 1,
      pointerEvents: "none",
      transform: "translate(12px, 16px) scale(1)",
      maxWidth: "calc(100% - 24px)"
    }
  }, {
    props: {
      variant: "filled",
      size: "small"
    },
    style: {
      transform: "translate(12px, 13px) scale(1)"
    }
  }, {
    props: ({
      variant,
      ownerState
    }) => variant === "filled" && ownerState.shrink,
    style: {
      userSelect: "none",
      pointerEvents: "auto",
      transform: "translate(12px, 7px) scale(0.75)",
      maxWidth: "calc(133% - 24px)"
    }
  }, {
    props: ({
      variant,
      ownerState,
      size
    }) => variant === "filled" && ownerState.shrink && size === "small",
    style: {
      transform: "translate(12px, 4px) scale(0.75)"
    }
  }, {
    props: {
      variant: "outlined"
    },
    style: {
      // see comment above on filled.zIndex
      zIndex: 1,
      pointerEvents: "none",
      transform: "translate(14px, 16px) scale(1)",
      maxWidth: "calc(100% - 24px)"
    }
  }, {
    props: {
      variant: "outlined",
      size: "small"
    },
    style: {
      transform: "translate(14px, 9px) scale(1)"
    }
  }, {
    props: ({
      variant,
      ownerState
    }) => variant === "outlined" && ownerState.shrink,
    style: {
      userSelect: "none",
      pointerEvents: "auto",
      // Theoretically, we should have (8+5)*2/0.75 = 34px
      // but it feels a better when it bleeds a bit on the left, so 32px.
      maxWidth: "calc(133% - 32px)",
      transform: "translate(14px, -9px) scale(0.75)"
    }
  }]
})));
const InputLabel = /* @__PURE__ */ reactExports.forwardRef(function InputLabel2(inProps, ref) {
  const props = useDefaultProps({
    name: "MuiInputLabel",
    props: inProps
  });
  const {
    disableAnimation = false,
    margin,
    shrink: shrinkProp,
    variant,
    className,
    ...other
  } = props;
  const muiFormControl = useFormControl();
  let shrink = shrinkProp;
  if (typeof shrink === "undefined" && muiFormControl) {
    shrink = muiFormControl.filled || muiFormControl.focused || muiFormControl.adornedStart;
  }
  const fcs = formControlState({
    props,
    muiFormControl,
    states: ["size", "variant", "required", "focused"]
  });
  const ownerState = {
    ...props,
    disableAnimation,
    formControl: muiFormControl,
    shrink,
    size: fcs.size,
    variant: fcs.variant,
    required: fcs.required,
    focused: fcs.focused
  };
  const classes = useUtilityClasses$8(ownerState);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(InputLabelRoot, {
    "data-shrink": shrink,
    ref,
    className: clsx(classes.root, className),
    ...other,
    ownerState,
    classes
  });
});
const ListContext = /* @__PURE__ */ reactExports.createContext({});
function getListUtilityClass(slot) {
  return generateUtilityClass("MuiList", slot);
}
generateUtilityClasses("MuiList", ["root", "padding", "dense", "subheader"]);
const useUtilityClasses$7 = (ownerState) => {
  const {
    classes,
    disablePadding,
    dense,
    subheader
  } = ownerState;
  const slots = {
    root: ["root", !disablePadding && "padding", dense && "dense", subheader && "subheader"]
  };
  return composeClasses(slots, getListUtilityClass, classes);
};
const ListRoot = styled("ul", {
  name: "MuiList",
  slot: "Root",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.root, !ownerState.disablePadding && styles2.padding, ownerState.dense && styles2.dense, ownerState.subheader && styles2.subheader];
  }
})({
  listStyle: "none",
  margin: 0,
  padding: 0,
  position: "relative",
  variants: [{
    props: ({
      ownerState
    }) => !ownerState.disablePadding,
    style: {
      paddingTop: 8,
      paddingBottom: 8
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.subheader,
    style: {
      paddingTop: 0
    }
  }]
});
const List = /* @__PURE__ */ reactExports.forwardRef(function List2(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: "MuiList"
  });
  const {
    children,
    className,
    component = "ul",
    dense = false,
    disablePadding = false,
    subheader,
    ...other
  } = props;
  const context = reactExports.useMemo(() => ({
    dense
  }), [dense]);
  const ownerState = {
    ...props,
    component,
    dense,
    disablePadding
  };
  const classes = useUtilityClasses$7(ownerState);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ListContext.Provider, {
    value: context,
    children: /* @__PURE__ */ jsxRuntimeExports.jsxs(ListRoot, {
      as: component,
      className: clsx(classes.root, className),
      ref,
      ownerState,
      ...other,
      children: [subheader, children]
    })
  });
});
function nextItem(list, item, disableListWrap) {
  if (list === item) {
    return list.firstChild;
  }
  if (item && item.nextElementSibling) {
    return item.nextElementSibling;
  }
  return disableListWrap ? null : list.firstChild;
}
function previousItem(list, item, disableListWrap) {
  if (list === item) {
    return disableListWrap ? list.firstChild : list.lastChild;
  }
  if (item && item.previousElementSibling) {
    return item.previousElementSibling;
  }
  return disableListWrap ? null : list.lastChild;
}
function textCriteriaMatches(nextFocus, textCriteria) {
  if (textCriteria === void 0) {
    return true;
  }
  let text = nextFocus.innerText;
  if (text === void 0) {
    text = nextFocus.textContent;
  }
  text = text.trim().toLowerCase();
  if (text.length === 0) {
    return false;
  }
  if (textCriteria.repeating) {
    return text[0] === textCriteria.keys[0];
  }
  return text.startsWith(textCriteria.keys.join(""));
}
function moveFocus(list, currentFocus, disableListWrap, disabledItemsFocusable, traversalFunction, textCriteria) {
  let wrappedOnce = false;
  let nextFocus = traversalFunction(list, currentFocus, currentFocus ? disableListWrap : false);
  while (nextFocus) {
    if (nextFocus === list.firstChild) {
      if (wrappedOnce) {
        return false;
      }
      wrappedOnce = true;
    }
    const nextFocusDisabled = disabledItemsFocusable ? false : nextFocus.disabled || nextFocus.getAttribute("aria-disabled") === "true";
    if (!nextFocus.hasAttribute("tabindex") || !textCriteriaMatches(nextFocus, textCriteria) || nextFocusDisabled) {
      nextFocus = traversalFunction(list, nextFocus, disableListWrap);
    } else {
      nextFocus.focus();
      return true;
    }
  }
  return false;
}
const MenuList = /* @__PURE__ */ reactExports.forwardRef(function MenuList2(props, ref) {
  const {
    // private
    // eslint-disable-next-line react/prop-types
    actions,
    autoFocus = false,
    autoFocusItem = false,
    children,
    className,
    disabledItemsFocusable = false,
    disableListWrap = false,
    onKeyDown,
    variant = "selectedMenu",
    ...other
  } = props;
  const listRef = reactExports.useRef(null);
  const textCriteriaRef = reactExports.useRef({
    keys: [],
    repeating: true,
    previousKeyMatched: true,
    lastTime: null
  });
  useEnhancedEffect(() => {
    if (autoFocus) {
      listRef.current.focus();
    }
  }, [autoFocus]);
  reactExports.useImperativeHandle(actions, () => ({
    adjustStyleForScrollbar: (containerElement, {
      direction
    }) => {
      const noExplicitWidth = !listRef.current.style.width;
      if (containerElement.clientHeight < listRef.current.clientHeight && noExplicitWidth) {
        const scrollbarSize = `${getScrollbarSize(ownerWindow(containerElement))}px`;
        listRef.current.style[direction === "rtl" ? "paddingLeft" : "paddingRight"] = scrollbarSize;
        listRef.current.style.width = `calc(100% + ${scrollbarSize})`;
      }
      return listRef.current;
    }
  }), []);
  const handleKeyDown = (event) => {
    const list = listRef.current;
    const key = event.key;
    const isModifierKeyPressed = event.ctrlKey || event.metaKey || event.altKey;
    if (isModifierKeyPressed) {
      if (onKeyDown) {
        onKeyDown(event);
      }
      return;
    }
    const currentFocus = ownerDocument(list).activeElement;
    if (key === "ArrowDown") {
      event.preventDefault();
      moveFocus(list, currentFocus, disableListWrap, disabledItemsFocusable, nextItem);
    } else if (key === "ArrowUp") {
      event.preventDefault();
      moveFocus(list, currentFocus, disableListWrap, disabledItemsFocusable, previousItem);
    } else if (key === "Home") {
      event.preventDefault();
      moveFocus(list, null, disableListWrap, disabledItemsFocusable, nextItem);
    } else if (key === "End") {
      event.preventDefault();
      moveFocus(list, null, disableListWrap, disabledItemsFocusable, previousItem);
    } else if (key.length === 1) {
      const criteria = textCriteriaRef.current;
      const lowerKey = key.toLowerCase();
      const currTime = performance.now();
      if (criteria.keys.length > 0) {
        if (currTime - criteria.lastTime > 500) {
          criteria.keys = [];
          criteria.repeating = true;
          criteria.previousKeyMatched = true;
        } else if (criteria.repeating && lowerKey !== criteria.keys[0]) {
          criteria.repeating = false;
        }
      }
      criteria.lastTime = currTime;
      criteria.keys.push(lowerKey);
      const keepFocusOnCurrent = currentFocus && !criteria.repeating && textCriteriaMatches(currentFocus, criteria);
      if (criteria.previousKeyMatched && (keepFocusOnCurrent || moveFocus(list, currentFocus, false, disabledItemsFocusable, nextItem, criteria))) {
        event.preventDefault();
      } else {
        criteria.previousKeyMatched = false;
      }
    }
    if (onKeyDown) {
      onKeyDown(event);
    }
  };
  const handleRef = useForkRef(listRef, ref);
  let activeItemIndex = -1;
  reactExports.Children.forEach(children, (child, index) => {
    if (!/* @__PURE__ */ reactExports.isValidElement(child)) {
      if (activeItemIndex === index) {
        activeItemIndex += 1;
        if (activeItemIndex >= children.length) {
          activeItemIndex = -1;
        }
      }
      return;
    }
    if (!child.props.disabled) {
      if (variant === "selectedMenu" && child.props.selected) {
        activeItemIndex = index;
      } else if (activeItemIndex === -1) {
        activeItemIndex = index;
      }
    }
    if (activeItemIndex === index && (child.props.disabled || child.props.muiSkipListHighlight || child.type.muiSkipListHighlight)) {
      activeItemIndex += 1;
      if (activeItemIndex >= children.length) {
        activeItemIndex = -1;
      }
    }
  });
  const items = reactExports.Children.map(children, (child, index) => {
    if (index === activeItemIndex) {
      const newChildProps = {};
      if (autoFocusItem) {
        newChildProps.autoFocus = true;
      }
      if (child.props.tabIndex === void 0 && variant === "selectedMenu") {
        newChildProps.tabIndex = 0;
      }
      return /* @__PURE__ */ reactExports.cloneElement(child, newChildProps);
    }
    return child;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(List, {
    role: "menu",
    ref: handleRef,
    className,
    onKeyDown: handleKeyDown,
    tabIndex: autoFocus ? 0 : -1,
    ...other,
    children: items
  });
});
function getPopoverUtilityClass(slot) {
  return generateUtilityClass("MuiPopover", slot);
}
generateUtilityClasses("MuiPopover", ["root", "paper"]);
function getOffsetTop(rect, vertical) {
  let offset = 0;
  if (typeof vertical === "number") {
    offset = vertical;
  } else if (vertical === "center") {
    offset = rect.height / 2;
  } else if (vertical === "bottom") {
    offset = rect.height;
  }
  return offset;
}
function getOffsetLeft(rect, horizontal) {
  let offset = 0;
  if (typeof horizontal === "number") {
    offset = horizontal;
  } else if (horizontal === "center") {
    offset = rect.width / 2;
  } else if (horizontal === "right") {
    offset = rect.width;
  }
  return offset;
}
function getTransformOriginValue(transformOrigin) {
  return [transformOrigin.horizontal, transformOrigin.vertical].map((n) => typeof n === "number" ? `${n}px` : n).join(" ");
}
function resolveAnchorEl(anchorEl) {
  return typeof anchorEl === "function" ? anchorEl() : anchorEl;
}
const useUtilityClasses$6 = (ownerState) => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ["root"],
    paper: ["paper"]
  };
  return composeClasses(slots, getPopoverUtilityClass, classes);
};
const PopoverRoot = styled(Modal, {
  name: "MuiPopover",
  slot: "Root"
})({});
const PopoverPaper = styled(Paper, {
  name: "MuiPopover",
  slot: "Paper"
})({
  position: "absolute",
  overflowY: "auto",
  overflowX: "hidden",
  // So we see the popover when it's empty.
  // It's most likely on issue on userland.
  minWidth: 16,
  minHeight: 16,
  maxWidth: "calc(100% - 32px)",
  maxHeight: "calc(100% - 32px)",
  // We disable the focus ring for mouse, touch and keyboard users.
  outline: 0
});
const Popover = /* @__PURE__ */ reactExports.forwardRef(function Popover2(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: "MuiPopover"
  });
  const {
    action,
    anchorEl,
    anchorOrigin = {
      vertical: "top",
      horizontal: "left"
    },
    anchorPosition,
    anchorReference = "anchorEl",
    children,
    className,
    container: containerProp,
    elevation = 8,
    marginThreshold = 16,
    open,
    PaperProps: PaperPropsProp = {},
    // TODO: remove in v7
    slots = {},
    slotProps = {},
    transformOrigin = {
      vertical: "top",
      horizontal: "left"
    },
    TransitionComponent,
    // TODO: remove in v7
    transitionDuration: transitionDurationProp = "auto",
    TransitionProps = {},
    // TODO: remove in v7
    disableScrollLock = false,
    ...other
  } = props;
  const paperRef = reactExports.useRef();
  const ownerState = {
    ...props,
    anchorOrigin,
    anchorReference,
    elevation,
    marginThreshold,
    transformOrigin,
    TransitionComponent,
    transitionDuration: transitionDurationProp,
    TransitionProps
  };
  const classes = useUtilityClasses$6(ownerState);
  const getAnchorOffset = reactExports.useCallback(() => {
    if (anchorReference === "anchorPosition") {
      return anchorPosition;
    }
    const resolvedAnchorEl = resolveAnchorEl(anchorEl);
    const anchorElement = resolvedAnchorEl && resolvedAnchorEl.nodeType === 1 ? resolvedAnchorEl : ownerDocument(paperRef.current).body;
    const anchorRect = anchorElement.getBoundingClientRect();
    return {
      top: anchorRect.top + getOffsetTop(anchorRect, anchorOrigin.vertical),
      left: anchorRect.left + getOffsetLeft(anchorRect, anchorOrigin.horizontal)
    };
  }, [anchorEl, anchorOrigin.horizontal, anchorOrigin.vertical, anchorPosition, anchorReference]);
  const getTransformOrigin = reactExports.useCallback((elemRect) => {
    return {
      vertical: getOffsetTop(elemRect, transformOrigin.vertical),
      horizontal: getOffsetLeft(elemRect, transformOrigin.horizontal)
    };
  }, [transformOrigin.horizontal, transformOrigin.vertical]);
  const getPositioningStyle = reactExports.useCallback((element) => {
    const elemRect = {
      width: element.offsetWidth,
      height: element.offsetHeight
    };
    const elemTransformOrigin = getTransformOrigin(elemRect);
    if (anchorReference === "none") {
      return {
        top: null,
        left: null,
        transformOrigin: getTransformOriginValue(elemTransformOrigin)
      };
    }
    const anchorOffset = getAnchorOffset();
    let top = anchorOffset.top - elemTransformOrigin.vertical;
    let left = anchorOffset.left - elemTransformOrigin.horizontal;
    const bottom = top + elemRect.height;
    const right = left + elemRect.width;
    const containerWindow = ownerWindow(resolveAnchorEl(anchorEl));
    const heightThreshold = containerWindow.innerHeight - marginThreshold;
    const widthThreshold = containerWindow.innerWidth - marginThreshold;
    if (marginThreshold !== null && top < marginThreshold) {
      const diff = top - marginThreshold;
      top -= diff;
      elemTransformOrigin.vertical += diff;
    } else if (marginThreshold !== null && bottom > heightThreshold) {
      const diff = bottom - heightThreshold;
      top -= diff;
      elemTransformOrigin.vertical += diff;
    }
    if (marginThreshold !== null && left < marginThreshold) {
      const diff = left - marginThreshold;
      left -= diff;
      elemTransformOrigin.horizontal += diff;
    } else if (right > widthThreshold) {
      const diff = right - widthThreshold;
      left -= diff;
      elemTransformOrigin.horizontal += diff;
    }
    return {
      top: `${Math.round(top)}px`,
      left: `${Math.round(left)}px`,
      transformOrigin: getTransformOriginValue(elemTransformOrigin)
    };
  }, [anchorEl, anchorReference, getAnchorOffset, getTransformOrigin, marginThreshold]);
  const [isPositioned, setIsPositioned] = reactExports.useState(open);
  const setPositioningStyles = reactExports.useCallback(() => {
    const element = paperRef.current;
    if (!element) {
      return;
    }
    const positioning = getPositioningStyle(element);
    if (positioning.top !== null) {
      element.style.setProperty("top", positioning.top);
    }
    if (positioning.left !== null) {
      element.style.left = positioning.left;
    }
    element.style.transformOrigin = positioning.transformOrigin;
    setIsPositioned(true);
  }, [getPositioningStyle]);
  reactExports.useEffect(() => {
    if (disableScrollLock) {
      window.addEventListener("scroll", setPositioningStyles);
    }
    return () => window.removeEventListener("scroll", setPositioningStyles);
  }, [anchorEl, disableScrollLock, setPositioningStyles]);
  const handleEntering = () => {
    setPositioningStyles();
  };
  const handleExited = () => {
    setIsPositioned(false);
  };
  reactExports.useEffect(() => {
    if (open) {
      setPositioningStyles();
    }
  });
  reactExports.useImperativeHandle(action, () => open ? {
    updatePosition: () => {
      setPositioningStyles();
    }
  } : null, [open, setPositioningStyles]);
  reactExports.useEffect(() => {
    if (!open) {
      return void 0;
    }
    const handleResize = debounce(() => {
      setPositioningStyles();
    });
    const containerWindow = ownerWindow(resolveAnchorEl(anchorEl));
    containerWindow.addEventListener("resize", handleResize);
    return () => {
      handleResize.clear();
      containerWindow.removeEventListener("resize", handleResize);
    };
  }, [anchorEl, open, setPositioningStyles]);
  let transitionDuration = transitionDurationProp;
  const externalForwardedProps = {
    slots: {
      transition: TransitionComponent,
      ...slots
    },
    slotProps: {
      transition: TransitionProps,
      paper: PaperPropsProp,
      ...slotProps
    }
  };
  const [TransitionSlot, transitionSlotProps] = useSlot("transition", {
    elementType: Grow,
    externalForwardedProps,
    ownerState,
    getSlotProps: (handlers) => ({
      ...handlers,
      onEntering: (element, isAppearing) => {
        handlers.onEntering?.(element, isAppearing);
        handleEntering();
      },
      onExited: (element) => {
        handlers.onExited?.(element);
        handleExited();
      }
    }),
    additionalProps: {
      appear: true,
      in: open
    }
  });
  if (transitionDurationProp === "auto" && !TransitionSlot.muiSupportAuto) {
    transitionDuration = void 0;
  }
  const container = containerProp || (anchorEl ? ownerDocument(resolveAnchorEl(anchorEl)).body : void 0);
  const [RootSlot, {
    slots: rootSlotsProp,
    slotProps: rootSlotPropsProp,
    ...rootProps
  }] = useSlot("root", {
    ref,
    elementType: PopoverRoot,
    externalForwardedProps: {
      ...externalForwardedProps,
      ...other
    },
    shouldForwardComponentProp: true,
    additionalProps: {
      slots: {
        backdrop: slots.backdrop
      },
      slotProps: {
        backdrop: mergeSlotProps(typeof slotProps.backdrop === "function" ? slotProps.backdrop(ownerState) : slotProps.backdrop, {
          invisible: true
        })
      },
      container,
      open
    },
    ownerState,
    className: clsx(classes.root, className)
  });
  const [PaperSlot, paperProps] = useSlot("paper", {
    ref: paperRef,
    className: classes.paper,
    elementType: PopoverPaper,
    externalForwardedProps,
    shouldForwardComponentProp: true,
    additionalProps: {
      elevation,
      style: isPositioned ? void 0 : {
        opacity: 0
      }
    },
    ownerState
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(RootSlot, {
    ...rootProps,
    ...!isHostComponent(RootSlot) && {
      slots: rootSlotsProp,
      slotProps: rootSlotPropsProp,
      disableScrollLock
    },
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(TransitionSlot, {
      ...transitionSlotProps,
      timeout: transitionDuration,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(PaperSlot, {
        ...paperProps,
        children
      })
    })
  });
});
function getMenuUtilityClass(slot) {
  return generateUtilityClass("MuiMenu", slot);
}
generateUtilityClasses("MuiMenu", ["root", "paper", "list"]);
const RTL_ORIGIN = {
  vertical: "top",
  horizontal: "right"
};
const LTR_ORIGIN = {
  vertical: "top",
  horizontal: "left"
};
const useUtilityClasses$5 = (ownerState) => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ["root"],
    paper: ["paper"],
    list: ["list"]
  };
  return composeClasses(slots, getMenuUtilityClass, classes);
};
const MenuRoot = styled(Popover, {
  shouldForwardProp: (prop) => rootShouldForwardProp(prop) || prop === "classes",
  name: "MuiMenu",
  slot: "Root"
})({});
const MenuPaper = styled(PopoverPaper, {
  name: "MuiMenu",
  slot: "Paper"
})({
  // specZ: The maximum height of a simple menu should be one or more rows less than the view
  // height. This ensures a tappable area outside of the simple menu with which to dismiss
  // the menu.
  maxHeight: "calc(100% - 96px)",
  // Add iOS momentum scrolling for iOS < 13.0
  WebkitOverflowScrolling: "touch"
});
const MenuMenuList = styled(MenuList, {
  name: "MuiMenu",
  slot: "List"
})({
  // We disable the focus ring for mouse, touch and keyboard users.
  outline: 0
});
const Menu = /* @__PURE__ */ reactExports.forwardRef(function Menu2(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: "MuiMenu"
  });
  const {
    autoFocus = true,
    children,
    className,
    disableAutoFocusItem = false,
    MenuListProps = {},
    onClose,
    open,
    PaperProps = {},
    PopoverClasses,
    transitionDuration = "auto",
    TransitionProps: {
      onEntering,
      ...TransitionProps
    } = {},
    variant = "selectedMenu",
    slots = {},
    slotProps = {},
    ...other
  } = props;
  const isRtl = useRtl();
  const ownerState = {
    ...props,
    autoFocus,
    disableAutoFocusItem,
    MenuListProps,
    onEntering,
    PaperProps,
    transitionDuration,
    TransitionProps,
    variant
  };
  const classes = useUtilityClasses$5(ownerState);
  const autoFocusItem = autoFocus && !disableAutoFocusItem && open;
  const menuListActionsRef = reactExports.useRef(null);
  const handleEntering = (element, isAppearing) => {
    if (menuListActionsRef.current) {
      menuListActionsRef.current.adjustStyleForScrollbar(element, {
        direction: isRtl ? "rtl" : "ltr"
      });
    }
    if (onEntering) {
      onEntering(element, isAppearing);
    }
  };
  const handleListKeyDown = (event) => {
    if (event.key === "Tab") {
      event.preventDefault();
      if (onClose) {
        onClose(event, "tabKeyDown");
      }
    }
  };
  let activeItemIndex = -1;
  reactExports.Children.map(children, (child, index) => {
    if (!/* @__PURE__ */ reactExports.isValidElement(child)) {
      return;
    }
    if (!child.props.disabled) {
      if (variant === "selectedMenu" && child.props.selected) {
        activeItemIndex = index;
      } else if (activeItemIndex === -1) {
        activeItemIndex = index;
      }
    }
  });
  const externalForwardedProps = {
    slots,
    slotProps: {
      list: MenuListProps,
      transition: TransitionProps,
      paper: PaperProps,
      ...slotProps
    }
  };
  const rootSlotProps = useSlotProps({
    elementType: slots.root,
    externalSlotProps: slotProps.root,
    ownerState,
    className: [classes.root, className]
  });
  const [PaperSlot, paperSlotProps] = useSlot("paper", {
    className: classes.paper,
    elementType: MenuPaper,
    externalForwardedProps,
    shouldForwardComponentProp: true,
    ownerState
  });
  const [ListSlot, listSlotProps] = useSlot("list", {
    className: clsx(classes.list, MenuListProps.className),
    elementType: MenuMenuList,
    shouldForwardComponentProp: true,
    externalForwardedProps,
    getSlotProps: (handlers) => ({
      ...handlers,
      onKeyDown: (event) => {
        handleListKeyDown(event);
        handlers.onKeyDown?.(event);
      }
    }),
    ownerState
  });
  const resolvedTransitionProps = typeof externalForwardedProps.slotProps.transition === "function" ? externalForwardedProps.slotProps.transition(ownerState) : externalForwardedProps.slotProps.transition;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(MenuRoot, {
    onClose,
    anchorOrigin: {
      vertical: "bottom",
      horizontal: isRtl ? "right" : "left"
    },
    transformOrigin: isRtl ? RTL_ORIGIN : LTR_ORIGIN,
    slots: {
      root: slots.root,
      paper: PaperSlot,
      backdrop: slots.backdrop,
      ...slots.transition && {
        // TODO: pass `slots.transition` directly once `TransitionComponent` is removed from Popover
        transition: slots.transition
      }
    },
    slotProps: {
      root: rootSlotProps,
      paper: paperSlotProps,
      backdrop: typeof slotProps.backdrop === "function" ? slotProps.backdrop(ownerState) : slotProps.backdrop,
      transition: {
        ...resolvedTransitionProps,
        onEntering: (...args) => {
          handleEntering(...args);
          resolvedTransitionProps?.onEntering?.(...args);
        }
      }
    },
    open,
    ref,
    transitionDuration,
    ownerState,
    ...other,
    classes: PopoverClasses,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(ListSlot, {
      actions: menuListActionsRef,
      autoFocus: autoFocus && (activeItemIndex === -1 || disableAutoFocusItem),
      autoFocusItem,
      variant,
      ...listSlotProps,
      children
    })
  });
});
function getNativeSelectUtilityClasses(slot) {
  return generateUtilityClass("MuiNativeSelect", slot);
}
const nativeSelectClasses = generateUtilityClasses("MuiNativeSelect", ["root", "select", "multiple", "filled", "outlined", "standard", "disabled", "icon", "iconOpen", "iconFilled", "iconOutlined", "iconStandard", "nativeInput", "error"]);
const useUtilityClasses$4 = (ownerState) => {
  const {
    classes,
    variant,
    disabled,
    multiple,
    open,
    error
  } = ownerState;
  const slots = {
    select: ["select", variant, disabled && "disabled", multiple && "multiple", error && "error"],
    icon: ["icon", `icon${capitalize(variant)}`, open && "iconOpen", disabled && "disabled"]
  };
  return composeClasses(slots, getNativeSelectUtilityClasses, classes);
};
const StyledSelectSelect = styled("select", {
  name: "MuiNativeSelect"
})(({
  theme
}) => ({
  // Reset
  MozAppearance: "none",
  // Reset
  WebkitAppearance: "none",
  // When interacting quickly, the text can end up selected.
  // Native select can't be selected either.
  userSelect: "none",
  // Reset
  borderRadius: 0,
  cursor: "pointer",
  "&:focus": {
    // Reset Chrome style
    borderRadius: 0
  },
  [`&.${nativeSelectClasses.disabled}`]: {
    cursor: "default"
  },
  "&[multiple]": {
    height: "auto"
  },
  "&:not([multiple]) option, &:not([multiple]) optgroup": {
    backgroundColor: (theme.vars || theme).palette.background.paper
  },
  variants: [{
    props: ({
      ownerState
    }) => ownerState.variant !== "filled" && ownerState.variant !== "outlined",
    style: {
      // Bump specificity to allow extending custom inputs
      "&&&": {
        paddingRight: 24,
        minWidth: 16
        // So it doesn't collapse.
      }
    }
  }, {
    props: {
      variant: "filled"
    },
    style: {
      "&&&": {
        paddingRight: 32
      }
    }
  }, {
    props: {
      variant: "outlined"
    },
    style: {
      borderRadius: (theme.vars || theme).shape.borderRadius,
      "&:focus": {
        borderRadius: (theme.vars || theme).shape.borderRadius
        // Reset the reset for Chrome style
      },
      "&&&": {
        paddingRight: 32
      }
    }
  }]
}));
const NativeSelectSelect = styled(StyledSelectSelect, {
  name: "MuiNativeSelect",
  slot: "Select",
  shouldForwardProp: rootShouldForwardProp,
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.select, styles2[ownerState.variant], ownerState.error && styles2.error, {
      [`&.${nativeSelectClasses.multiple}`]: styles2.multiple
    }];
  }
})({});
const StyledSelectIcon = styled("svg", {
  name: "MuiNativeSelect"
})(({
  theme
}) => ({
  // We use a position absolute over a flexbox in order to forward the pointer events
  // to the input and to support wrapping tags..
  position: "absolute",
  right: 0,
  // Center vertically, height is 1em
  top: "calc(50% - .5em)",
  // Don't block pointer events on the select under the icon.
  pointerEvents: "none",
  color: (theme.vars || theme).palette.action.active,
  [`&.${nativeSelectClasses.disabled}`]: {
    color: (theme.vars || theme).palette.action.disabled
  },
  variants: [{
    props: ({
      ownerState
    }) => ownerState.open,
    style: {
      transform: "rotate(180deg)"
    }
  }, {
    props: {
      variant: "filled"
    },
    style: {
      right: 7
    }
  }, {
    props: {
      variant: "outlined"
    },
    style: {
      right: 7
    }
  }]
}));
const NativeSelectIcon = styled(StyledSelectIcon, {
  name: "MuiNativeSelect",
  slot: "Icon",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.icon, ownerState.variant && styles2[`icon${capitalize(ownerState.variant)}`], ownerState.open && styles2.iconOpen];
  }
})({});
const NativeSelectInput = /* @__PURE__ */ reactExports.forwardRef(function NativeSelectInput2(props, ref) {
  const {
    className,
    disabled,
    error,
    IconComponent,
    inputRef,
    variant = "standard",
    ...other
  } = props;
  const ownerState = {
    ...props,
    disabled,
    variant,
    error
  };
  const classes = useUtilityClasses$4(ownerState);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(reactExports.Fragment, {
    children: [/* @__PURE__ */ jsxRuntimeExports.jsx(NativeSelectSelect, {
      ownerState,
      className: clsx(classes.select, className),
      disabled,
      ref: inputRef || ref,
      ...other
    }), props.multiple ? null : /* @__PURE__ */ jsxRuntimeExports.jsx(NativeSelectIcon, {
      as: IconComponent,
      ownerState,
      className: classes.icon
    })]
  });
});
var _span$1;
const NotchedOutlineRoot$1 = styled("fieldset", {
  name: "MuiNotchedOutlined",
  shouldForwardProp: rootShouldForwardProp
})({
  textAlign: "left",
  position: "absolute",
  bottom: 0,
  right: 0,
  top: -5,
  left: 0,
  margin: 0,
  padding: "0 8px",
  pointerEvents: "none",
  borderRadius: "inherit",
  borderStyle: "solid",
  borderWidth: 1,
  overflow: "hidden",
  minWidth: "0%"
});
const NotchedOutlineLegend = styled("legend", {
  name: "MuiNotchedOutlined",
  shouldForwardProp: rootShouldForwardProp
})(memoTheme(({
  theme
}) => ({
  float: "unset",
  // Fix conflict with bootstrap
  width: "auto",
  // Fix conflict with bootstrap
  overflow: "hidden",
  // Fix Horizontal scroll when label too long
  variants: [{
    props: ({
      ownerState
    }) => !ownerState.withLabel,
    style: {
      padding: 0,
      lineHeight: "11px",
      // sync with `height` in `legend` styles
      transition: theme.transitions.create("width", {
        duration: 150,
        easing: theme.transitions.easing.easeOut
      })
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.withLabel,
    style: {
      display: "block",
      // Fix conflict with normalize.css and sanitize.css
      padding: 0,
      height: 11,
      // sync with `lineHeight` in `legend` styles
      fontSize: "0.75em",
      visibility: "hidden",
      maxWidth: 0.01,
      transition: theme.transitions.create("max-width", {
        duration: 50,
        easing: theme.transitions.easing.easeOut
      }),
      whiteSpace: "nowrap",
      "& > span": {
        paddingLeft: 5,
        paddingRight: 5,
        display: "inline-block",
        opacity: 0,
        visibility: "visible"
      }
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.withLabel && ownerState.notched,
    style: {
      maxWidth: "100%",
      transition: theme.transitions.create("max-width", {
        duration: 100,
        easing: theme.transitions.easing.easeOut,
        delay: 50
      })
    }
  }]
})));
function NotchedOutline(props) {
  const {
    children,
    classes,
    className,
    label,
    notched,
    ...other
  } = props;
  const withLabel = label != null && label !== "";
  const ownerState = {
    ...props,
    notched,
    withLabel
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(NotchedOutlineRoot$1, {
    "aria-hidden": true,
    className,
    ownerState,
    ...other,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(NotchedOutlineLegend, {
      ownerState,
      children: withLabel ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", {
        children: label
      }) : (
        // notranslate needed while Google Translate will not fix zero-width space issue
        _span$1 || (_span$1 = /* @__PURE__ */ jsxRuntimeExports.jsx("span", {
          className: "notranslate",
          "aria-hidden": true,
          children: "​"
        }))
      )
    })
  });
}
const useUtilityClasses$3 = (ownerState) => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ["root"],
    notchedOutline: ["notchedOutline"],
    input: ["input"]
  };
  const composedClasses = composeClasses(slots, getOutlinedInputUtilityClass, classes);
  return {
    ...classes,
    // forward classes to the InputBase
    ...composedClasses
  };
};
const OutlinedInputRoot = styled(InputBaseRoot, {
  shouldForwardProp: (prop) => rootShouldForwardProp(prop) || prop === "classes",
  name: "MuiOutlinedInput",
  slot: "Root",
  overridesResolver: rootOverridesResolver
})(memoTheme(({
  theme
}) => {
  const borderColor = theme.palette.mode === "light" ? "rgba(0, 0, 0, 0.23)" : "rgba(255, 255, 255, 0.23)";
  return {
    position: "relative",
    borderRadius: (theme.vars || theme).shape.borderRadius,
    [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
      borderColor: (theme.vars || theme).palette.text.primary
    },
    // Reset on touch devices, it doesn't add specificity
    "@media (hover: none)": {
      [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
        borderColor: theme.vars ? `rgba(${theme.vars.palette.common.onBackgroundChannel} / 0.23)` : borderColor
      }
    },
    [`&.${outlinedInputClasses.focused} .${outlinedInputClasses.notchedOutline}`]: {
      borderWidth: 2
    },
    variants: [...Object.entries(theme.palette).filter(createSimplePaletteValueFilter()).map(([color]) => ({
      props: {
        color
      },
      style: {
        [`&.${outlinedInputClasses.focused} .${outlinedInputClasses.notchedOutline}`]: {
          borderColor: (theme.vars || theme).palette[color].main
        }
      }
    })), {
      props: {},
      // to overide the above style
      style: {
        [`&.${outlinedInputClasses.error} .${outlinedInputClasses.notchedOutline}`]: {
          borderColor: (theme.vars || theme).palette.error.main
        },
        [`&.${outlinedInputClasses.disabled} .${outlinedInputClasses.notchedOutline}`]: {
          borderColor: (theme.vars || theme).palette.action.disabled
        }
      }
    }, {
      props: ({
        ownerState
      }) => ownerState.startAdornment,
      style: {
        paddingLeft: 14
      }
    }, {
      props: ({
        ownerState
      }) => ownerState.endAdornment,
      style: {
        paddingRight: 14
      }
    }, {
      props: ({
        ownerState
      }) => ownerState.multiline,
      style: {
        padding: "16.5px 14px"
      }
    }, {
      props: ({
        ownerState,
        size
      }) => ownerState.multiline && size === "small",
      style: {
        padding: "8.5px 14px"
      }
    }]
  };
}));
const NotchedOutlineRoot = styled(NotchedOutline, {
  name: "MuiOutlinedInput",
  slot: "NotchedOutline"
})(memoTheme(({
  theme
}) => {
  const borderColor = theme.palette.mode === "light" ? "rgba(0, 0, 0, 0.23)" : "rgba(255, 255, 255, 0.23)";
  return {
    borderColor: theme.vars ? `rgba(${theme.vars.palette.common.onBackgroundChannel} / 0.23)` : borderColor
  };
}));
const OutlinedInputInput = styled(InputBaseInput, {
  name: "MuiOutlinedInput",
  slot: "Input",
  overridesResolver: inputOverridesResolver
})(memoTheme(({
  theme
}) => ({
  padding: "16.5px 14px",
  ...!theme.vars && {
    "&:-webkit-autofill": {
      WebkitBoxShadow: theme.palette.mode === "light" ? null : "0 0 0 100px #266798 inset",
      WebkitTextFillColor: theme.palette.mode === "light" ? null : "#fff",
      caretColor: theme.palette.mode === "light" ? null : "#fff",
      borderRadius: "inherit"
    }
  },
  ...theme.vars && {
    "&:-webkit-autofill": {
      borderRadius: "inherit"
    },
    [theme.getColorSchemeSelector("dark")]: {
      "&:-webkit-autofill": {
        WebkitBoxShadow: "0 0 0 100px #266798 inset",
        WebkitTextFillColor: "#fff",
        caretColor: "#fff"
      }
    }
  },
  variants: [{
    props: {
      size: "small"
    },
    style: {
      padding: "8.5px 14px"
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.multiline,
    style: {
      padding: 0
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.startAdornment,
    style: {
      paddingLeft: 0
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.endAdornment,
    style: {
      paddingRight: 0
    }
  }]
})));
const OutlinedInput = /* @__PURE__ */ reactExports.forwardRef(function OutlinedInput2(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: "MuiOutlinedInput"
  });
  const {
    components = {},
    fullWidth = false,
    inputComponent = "input",
    label,
    multiline = false,
    notched,
    slots = {},
    slotProps = {},
    type = "text",
    ...other
  } = props;
  const classes = useUtilityClasses$3(props);
  const muiFormControl = useFormControl();
  const fcs = formControlState({
    props,
    muiFormControl,
    states: ["color", "disabled", "error", "focused", "hiddenLabel", "size", "required"]
  });
  const ownerState = {
    ...props,
    color: fcs.color || "primary",
    disabled: fcs.disabled,
    error: fcs.error,
    focused: fcs.focused,
    formControl: muiFormControl,
    fullWidth,
    hiddenLabel: fcs.hiddenLabel,
    multiline,
    size: fcs.size,
    type
  };
  const RootSlot = slots.root ?? components.Root ?? OutlinedInputRoot;
  const InputSlot = slots.input ?? components.Input ?? OutlinedInputInput;
  const [NotchedSlot, notchedProps] = useSlot("notchedOutline", {
    elementType: NotchedOutlineRoot,
    className: classes.notchedOutline,
    shouldForwardComponentProp: true,
    ownerState,
    externalForwardedProps: {
      slots,
      slotProps
    },
    additionalProps: {
      label: label != null && label !== "" && fcs.required ? /* @__PURE__ */ jsxRuntimeExports.jsxs(reactExports.Fragment, {
        children: [label, " ", "*"]
      }) : label
    }
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(InputBase, {
    slots: {
      root: RootSlot,
      input: InputSlot
    },
    slotProps,
    renderSuffix: (state) => /* @__PURE__ */ jsxRuntimeExports.jsx(NotchedSlot, {
      ...notchedProps,
      notched: typeof notched !== "undefined" ? notched : Boolean(state.startAdornment || state.filled || state.focused)
    }),
    fullWidth,
    inputComponent,
    multiline,
    ref,
    type,
    ...other,
    classes: {
      ...classes,
      notchedOutline: null
    }
  });
});
OutlinedInput.muiName = "Input";
function getSelectUtilityClasses(slot) {
  return generateUtilityClass("MuiSelect", slot);
}
const selectClasses = generateUtilityClasses("MuiSelect", ["root", "select", "multiple", "filled", "outlined", "standard", "disabled", "focused", "icon", "iconOpen", "iconFilled", "iconOutlined", "iconStandard", "nativeInput", "error"]);
var _span;
const SelectSelect = styled(StyledSelectSelect, {
  name: "MuiSelect",
  slot: "Select",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [
      // Win specificity over the input base
      {
        [`&.${selectClasses.select}`]: styles2.select
      },
      {
        [`&.${selectClasses.select}`]: styles2[ownerState.variant]
      },
      {
        [`&.${selectClasses.error}`]: styles2.error
      },
      {
        [`&.${selectClasses.multiple}`]: styles2.multiple
      }
    ];
  }
})({
  // Win specificity over the input base
  [`&.${selectClasses.select}`]: {
    height: "auto",
    // Resets for multiple select with chips
    minHeight: "1.4375em",
    // Required for select\text-field height consistency
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden"
  }
});
const SelectIcon = styled(StyledSelectIcon, {
  name: "MuiSelect",
  slot: "Icon",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.icon, ownerState.variant && styles2[`icon${capitalize(ownerState.variant)}`], ownerState.open && styles2.iconOpen];
  }
})({});
const SelectNativeInput = styled("input", {
  shouldForwardProp: (prop) => slotShouldForwardProp(prop) && prop !== "classes",
  name: "MuiSelect",
  slot: "NativeInput"
})({
  bottom: 0,
  left: 0,
  position: "absolute",
  opacity: 0,
  pointerEvents: "none",
  width: "100%",
  boxSizing: "border-box"
});
function areEqualValues(a, b) {
  if (typeof b === "object" && b !== null) {
    return a === b;
  }
  return String(a) === String(b);
}
function isEmpty(display) {
  return display == null || typeof display === "string" && !display.trim();
}
const useUtilityClasses$2 = (ownerState) => {
  const {
    classes,
    variant,
    disabled,
    multiple,
    open,
    error
  } = ownerState;
  const slots = {
    select: ["select", variant, disabled && "disabled", multiple && "multiple", error && "error"],
    icon: ["icon", `icon${capitalize(variant)}`, open && "iconOpen", disabled && "disabled"],
    nativeInput: ["nativeInput"]
  };
  return composeClasses(slots, getSelectUtilityClasses, classes);
};
const SelectInput = /* @__PURE__ */ reactExports.forwardRef(function SelectInput2(props, ref) {
  const {
    "aria-describedby": ariaDescribedby,
    "aria-label": ariaLabel,
    autoFocus,
    autoWidth,
    children,
    className,
    defaultOpen,
    defaultValue,
    disabled,
    displayEmpty,
    error = false,
    IconComponent,
    inputRef: inputRefProp,
    labelId,
    MenuProps = {},
    multiple,
    name,
    onBlur,
    onChange,
    onClose,
    onFocus,
    onOpen,
    open: openProp,
    readOnly,
    renderValue,
    required,
    SelectDisplayProps = {},
    tabIndex: tabIndexProp,
    // catching `type` from Input which makes no sense for SelectInput
    type,
    value: valueProp,
    variant = "standard",
    ...other
  } = props;
  const [value, setValueState] = useControlled({
    controlled: valueProp,
    default: defaultValue,
    name: "Select"
  });
  const [openState, setOpenState] = useControlled({
    controlled: openProp,
    default: defaultOpen,
    name: "Select"
  });
  const inputRef = reactExports.useRef(null);
  const displayRef = reactExports.useRef(null);
  const [displayNode, setDisplayNode] = reactExports.useState(null);
  const {
    current: isOpenControlled
  } = reactExports.useRef(openProp != null);
  const [menuMinWidthState, setMenuMinWidthState] = reactExports.useState();
  const handleRef = useForkRef(ref, inputRefProp);
  const handleDisplayRef = reactExports.useCallback((node) => {
    displayRef.current = node;
    if (node) {
      setDisplayNode(node);
    }
  }, []);
  const anchorElement = displayNode?.parentNode;
  reactExports.useImperativeHandle(handleRef, () => ({
    focus: () => {
      displayRef.current.focus();
    },
    node: inputRef.current,
    value
  }), [value]);
  reactExports.useEffect(() => {
    if (defaultOpen && openState && displayNode && !isOpenControlled) {
      setMenuMinWidthState(autoWidth ? null : anchorElement.clientWidth);
      displayRef.current.focus();
    }
  }, [displayNode, autoWidth]);
  reactExports.useEffect(() => {
    if (autoFocus) {
      displayRef.current.focus();
    }
  }, [autoFocus]);
  reactExports.useEffect(() => {
    if (!labelId) {
      return void 0;
    }
    const label = ownerDocument(displayRef.current).getElementById(labelId);
    if (label) {
      const handler = () => {
        if (getSelection().isCollapsed) {
          displayRef.current.focus();
        }
      };
      label.addEventListener("click", handler);
      return () => {
        label.removeEventListener("click", handler);
      };
    }
    return void 0;
  }, [labelId]);
  const update = (open2, event) => {
    if (open2) {
      if (onOpen) {
        onOpen(event);
      }
    } else if (onClose) {
      onClose(event);
    }
    if (!isOpenControlled) {
      setMenuMinWidthState(autoWidth ? null : anchorElement.clientWidth);
      setOpenState(open2);
    }
  };
  const handleMouseDown = (event) => {
    if (event.button !== 0) {
      return;
    }
    event.preventDefault();
    displayRef.current.focus();
    update(true, event);
  };
  const handleClose = (event) => {
    update(false, event);
  };
  const childrenArray = reactExports.Children.toArray(children);
  const handleChange = (event) => {
    const child = childrenArray.find((childItem) => childItem.props.value === event.target.value);
    if (child === void 0) {
      return;
    }
    setValueState(child.props.value);
    if (onChange) {
      onChange(event, child);
    }
  };
  const handleItemClick = (child) => (event) => {
    let newValue;
    if (!event.currentTarget.hasAttribute("tabindex")) {
      return;
    }
    if (multiple) {
      newValue = Array.isArray(value) ? value.slice() : [];
      const itemIndex = value.indexOf(child.props.value);
      if (itemIndex === -1) {
        newValue.push(child.props.value);
      } else {
        newValue.splice(itemIndex, 1);
      }
    } else {
      newValue = child.props.value;
    }
    if (child.props.onClick) {
      child.props.onClick(event);
    }
    if (value !== newValue) {
      setValueState(newValue);
      if (onChange) {
        const nativeEvent = event.nativeEvent || event;
        const clonedEvent = new nativeEvent.constructor(nativeEvent.type, nativeEvent);
        Object.defineProperty(clonedEvent, "target", {
          writable: true,
          value: {
            value: newValue,
            name
          }
        });
        onChange(clonedEvent, child);
      }
    }
    if (!multiple) {
      update(false, event);
    }
  };
  const handleKeyDown = (event) => {
    if (!readOnly) {
      const validKeys = [
        " ",
        "ArrowUp",
        "ArrowDown",
        // The native select doesn't respond to enter on macOS, but it's recommended by
        // https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/
        "Enter"
      ];
      if (validKeys.includes(event.key)) {
        event.preventDefault();
        update(true, event);
      }
    }
  };
  const open = displayNode !== null && openState;
  const handleBlur = (event) => {
    if (!open && onBlur) {
      Object.defineProperty(event, "target", {
        writable: true,
        value: {
          value,
          name
        }
      });
      onBlur(event);
    }
  };
  delete other["aria-invalid"];
  let display;
  let displaySingle;
  const displayMultiple = [];
  let computeDisplay = false;
  if (isFilled({
    value
  }) || displayEmpty) {
    if (renderValue) {
      display = renderValue(value);
    } else {
      computeDisplay = true;
    }
  }
  const items = childrenArray.map((child) => {
    if (!/* @__PURE__ */ reactExports.isValidElement(child)) {
      return null;
    }
    let selected;
    if (multiple) {
      if (!Array.isArray(value)) {
        throw new Error(formatMuiErrorMessage(2));
      }
      selected = value.some((v) => areEqualValues(v, child.props.value));
      if (selected && computeDisplay) {
        displayMultiple.push(child.props.children);
      }
    } else {
      selected = areEqualValues(value, child.props.value);
      if (selected && computeDisplay) {
        displaySingle = child.props.children;
      }
    }
    return /* @__PURE__ */ reactExports.cloneElement(child, {
      "aria-selected": selected ? "true" : "false",
      onClick: handleItemClick(child),
      onKeyUp: (event) => {
        if (event.key === " ") {
          event.preventDefault();
        }
        if (child.props.onKeyUp) {
          child.props.onKeyUp(event);
        }
      },
      role: "option",
      selected,
      value: void 0,
      // The value is most likely not a valid HTML attribute.
      "data-value": child.props.value
      // Instead, we provide it as a data attribute.
    });
  });
  if (computeDisplay) {
    if (multiple) {
      if (displayMultiple.length === 0) {
        display = null;
      } else {
        display = displayMultiple.reduce((output, child, index) => {
          output.push(child);
          if (index < displayMultiple.length - 1) {
            output.push(", ");
          }
          return output;
        }, []);
      }
    } else {
      display = displaySingle;
    }
  }
  let menuMinWidth = menuMinWidthState;
  if (!autoWidth && isOpenControlled && displayNode) {
    menuMinWidth = anchorElement.clientWidth;
  }
  let tabIndex;
  if (typeof tabIndexProp !== "undefined") {
    tabIndex = tabIndexProp;
  } else {
    tabIndex = disabled ? null : 0;
  }
  const buttonId = SelectDisplayProps.id || (name ? `mui-component-select-${name}` : void 0);
  const ownerState = {
    ...props,
    variant,
    value,
    open,
    error
  };
  const classes = useUtilityClasses$2(ownerState);
  const paperProps = {
    ...MenuProps.PaperProps,
    ...MenuProps.slotProps?.paper
  };
  const listProps = {
    ...MenuProps.MenuListProps,
    ...MenuProps.slotProps?.list
  };
  const listboxId = useId();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(reactExports.Fragment, {
    children: [/* @__PURE__ */ jsxRuntimeExports.jsx(SelectSelect, {
      as: "div",
      ref: handleDisplayRef,
      tabIndex,
      role: "combobox",
      "aria-controls": open ? listboxId : void 0,
      "aria-disabled": disabled ? "true" : void 0,
      "aria-expanded": open ? "true" : "false",
      "aria-haspopup": "listbox",
      "aria-label": ariaLabel,
      "aria-labelledby": [labelId, buttonId].filter(Boolean).join(" ") || void 0,
      "aria-describedby": ariaDescribedby,
      "aria-required": required ? "true" : void 0,
      "aria-invalid": error ? "true" : void 0,
      onKeyDown: handleKeyDown,
      onMouseDown: disabled || readOnly ? null : handleMouseDown,
      onBlur: handleBlur,
      onFocus,
      ...SelectDisplayProps,
      ownerState,
      className: clsx(SelectDisplayProps.className, classes.select, className),
      id: buttonId,
      children: isEmpty(display) ? (
        // notranslate needed while Google Translate will not fix zero-width space issue
        _span || (_span = /* @__PURE__ */ jsxRuntimeExports.jsx("span", {
          className: "notranslate",
          "aria-hidden": true,
          children: "​"
        }))
      ) : display
    }), /* @__PURE__ */ jsxRuntimeExports.jsx(SelectNativeInput, {
      "aria-invalid": error,
      value: Array.isArray(value) ? value.join(",") : value,
      name,
      ref: inputRef,
      "aria-hidden": true,
      onChange: handleChange,
      tabIndex: -1,
      disabled,
      className: classes.nativeInput,
      autoFocus,
      required,
      ...other,
      ownerState
    }), /* @__PURE__ */ jsxRuntimeExports.jsx(SelectIcon, {
      as: IconComponent,
      className: classes.icon,
      ownerState
    }), /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, {
      id: `menu-${name || ""}`,
      anchorEl: anchorElement,
      open,
      onClose: handleClose,
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "center"
      },
      transformOrigin: {
        vertical: "top",
        horizontal: "center"
      },
      ...MenuProps,
      slotProps: {
        ...MenuProps.slotProps,
        list: {
          "aria-labelledby": labelId,
          role: "listbox",
          "aria-multiselectable": multiple ? "true" : void 0,
          disableListWrap: true,
          id: listboxId,
          ...listProps
        },
        paper: {
          ...paperProps,
          style: {
            minWidth: menuMinWidth,
            ...paperProps != null ? paperProps.style : null
          }
        }
      },
      children: items
    })]
  });
});
const useUtilityClasses$1 = (ownerState) => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ["root"]
  };
  const composedClasses = composeClasses(slots, getSelectUtilityClasses, classes);
  return {
    ...classes,
    ...composedClasses
  };
};
const styledRootConfig = {
  name: "MuiSelect",
  slot: "Root",
  shouldForwardProp: (prop) => rootShouldForwardProp(prop) && prop !== "variant"
};
const StyledInput = styled(Input, styledRootConfig)("");
const StyledOutlinedInput = styled(OutlinedInput, styledRootConfig)("");
const StyledFilledInput = styled(FilledInput, styledRootConfig)("");
const Select = /* @__PURE__ */ reactExports.forwardRef(function Select2(inProps, ref) {
  const props = useDefaultProps({
    name: "MuiSelect",
    props: inProps
  });
  const {
    autoWidth = false,
    children,
    classes: classesProp = {},
    className,
    defaultOpen = false,
    displayEmpty = false,
    IconComponent = ArrowDropDownIcon,
    id,
    input,
    inputProps,
    label,
    labelId,
    MenuProps,
    multiple = false,
    native = false,
    onClose,
    onOpen,
    open,
    renderValue,
    SelectDisplayProps,
    variant: variantProp = "outlined",
    ...other
  } = props;
  const inputComponent = native ? NativeSelectInput : SelectInput;
  const muiFormControl = useFormControl();
  const fcs = formControlState({
    props,
    muiFormControl,
    states: ["variant", "error"]
  });
  const variant = fcs.variant || variantProp;
  const ownerState = {
    ...props,
    variant,
    classes: classesProp
  };
  const classes = useUtilityClasses$1(ownerState);
  const {
    root,
    ...restOfClasses
  } = classes;
  const InputComponent = input || {
    standard: /* @__PURE__ */ jsxRuntimeExports.jsx(StyledInput, {
      ownerState
    }),
    outlined: /* @__PURE__ */ jsxRuntimeExports.jsx(StyledOutlinedInput, {
      label,
      ownerState
    }),
    filled: /* @__PURE__ */ jsxRuntimeExports.jsx(StyledFilledInput, {
      ownerState
    })
  }[variant];
  const inputComponentRef = useForkRef(ref, getReactElementRef(InputComponent));
  return /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Fragment, {
    children: /* @__PURE__ */ reactExports.cloneElement(InputComponent, {
      // Most of the logic is implemented in `SelectInput`.
      // The `Select` component is a simple API wrapper to expose something better to play with.
      inputComponent,
      inputProps: {
        children,
        error: fcs.error,
        IconComponent,
        variant,
        type: void 0,
        // We render a select. We can ignore the type provided by the `Input`.
        multiple,
        ...native ? {
          id
        } : {
          autoWidth,
          defaultOpen,
          displayEmpty,
          labelId,
          MenuProps,
          onClose,
          onOpen,
          open,
          renderValue,
          SelectDisplayProps: {
            id,
            ...SelectDisplayProps
          }
        },
        ...inputProps,
        classes: inputProps ? deepmerge(restOfClasses, inputProps.classes) : restOfClasses,
        ...input ? input.props.inputProps : {}
      },
      ...(multiple && native || displayEmpty) && variant === "outlined" ? {
        notched: true
      } : {},
      ref: inputComponentRef,
      className: clsx(InputComponent.props.className, className, classes.root),
      // If a custom input is provided via 'input' prop, do not allow 'variant' to be propagated to it's root element. See https://github.com/mui/material-ui/issues/33894.
      ...!input && {
        variant
      },
      ...other
    })
  });
});
Select.muiName = "Select";
function getTextFieldUtilityClass(slot) {
  return generateUtilityClass("MuiTextField", slot);
}
generateUtilityClasses("MuiTextField", ["root"]);
const variantComponent = {
  standard: Input,
  filled: FilledInput,
  outlined: OutlinedInput
};
const useUtilityClasses = (ownerState) => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ["root"]
  };
  return composeClasses(slots, getTextFieldUtilityClass, classes);
};
const TextFieldRoot = styled(FormControl, {
  name: "MuiTextField",
  slot: "Root"
})({});
const TextField = /* @__PURE__ */ reactExports.forwardRef(function TextField2(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: "MuiTextField"
  });
  const {
    autoComplete,
    autoFocus = false,
    children,
    className,
    color = "primary",
    defaultValue,
    disabled = false,
    error = false,
    FormHelperTextProps: FormHelperTextPropsProp,
    fullWidth = false,
    helperText,
    id: idOverride,
    InputLabelProps: InputLabelPropsProp,
    inputProps: inputPropsProp,
    InputProps: InputPropsProp,
    inputRef,
    label,
    maxRows,
    minRows,
    multiline = false,
    name,
    onBlur,
    onChange,
    onFocus,
    placeholder,
    required = false,
    rows,
    select = false,
    SelectProps: SelectPropsProp,
    slots = {},
    slotProps = {},
    type,
    value,
    variant = "outlined",
    ...other
  } = props;
  const ownerState = {
    ...props,
    autoFocus,
    color,
    disabled,
    error,
    fullWidth,
    multiline,
    required,
    select,
    variant
  };
  const classes = useUtilityClasses(ownerState);
  const id = useId(idOverride);
  const helperTextId = helperText && id ? `${id}-helper-text` : void 0;
  const inputLabelId = label && id ? `${id}-label` : void 0;
  const InputComponent = variantComponent[variant];
  const externalForwardedProps = {
    slots,
    slotProps: {
      input: InputPropsProp,
      inputLabel: InputLabelPropsProp,
      htmlInput: inputPropsProp,
      formHelperText: FormHelperTextPropsProp,
      select: SelectPropsProp,
      ...slotProps
    }
  };
  const inputAdditionalProps = {};
  const inputLabelSlotProps = externalForwardedProps.slotProps.inputLabel;
  if (variant === "outlined") {
    if (inputLabelSlotProps && typeof inputLabelSlotProps.shrink !== "undefined") {
      inputAdditionalProps.notched = inputLabelSlotProps.shrink;
    }
    inputAdditionalProps.label = label;
  }
  if (select) {
    if (!SelectPropsProp || !SelectPropsProp.native) {
      inputAdditionalProps.id = void 0;
    }
    inputAdditionalProps["aria-describedby"] = void 0;
  }
  const [RootSlot, rootProps] = useSlot("root", {
    elementType: TextFieldRoot,
    shouldForwardComponentProp: true,
    externalForwardedProps: {
      ...externalForwardedProps,
      ...other
    },
    ownerState,
    className: clsx(classes.root, className),
    ref,
    additionalProps: {
      disabled,
      error,
      fullWidth,
      required,
      color,
      variant
    }
  });
  const [InputSlot, inputProps] = useSlot("input", {
    elementType: InputComponent,
    externalForwardedProps,
    additionalProps: inputAdditionalProps,
    ownerState
  });
  const [InputLabelSlot, inputLabelProps] = useSlot("inputLabel", {
    elementType: InputLabel,
    externalForwardedProps,
    ownerState
  });
  const [HtmlInputSlot, htmlInputProps] = useSlot("htmlInput", {
    elementType: "input",
    externalForwardedProps,
    ownerState
  });
  const [FormHelperTextSlot, formHelperTextProps] = useSlot("formHelperText", {
    elementType: FormHelperText,
    externalForwardedProps,
    ownerState
  });
  const [SelectSlot, selectProps] = useSlot("select", {
    elementType: Select,
    externalForwardedProps,
    ownerState
  });
  const InputElement = /* @__PURE__ */ jsxRuntimeExports.jsx(InputSlot, {
    "aria-describedby": helperTextId,
    autoComplete,
    autoFocus,
    defaultValue,
    fullWidth,
    multiline,
    name,
    rows,
    maxRows,
    minRows,
    type,
    value,
    id,
    inputRef,
    onBlur,
    onChange,
    onFocus,
    placeholder,
    inputProps: htmlInputProps,
    slots: {
      input: slots.htmlInput ? HtmlInputSlot : void 0
    },
    ...inputProps
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(RootSlot, {
    ...rootProps,
    children: [label != null && label !== "" && /* @__PURE__ */ jsxRuntimeExports.jsx(InputLabelSlot, {
      htmlFor: id,
      id: inputLabelId,
      ...inputLabelProps,
      children: label
    }), select ? /* @__PURE__ */ jsxRuntimeExports.jsx(SelectSlot, {
      "aria-describedby": helperTextId,
      id,
      labelId: inputLabelId,
      value,
      input: InputElement,
      ...selectProps,
      children
    }) : InputElement, helperText && /* @__PURE__ */ jsxRuntimeExports.jsx(FormHelperTextSlot, {
      id: helperTextId,
      ...formHelperTextProps,
      children: helperText
    })]
  });
});
const useUserRole = () => {
  const { user } = useAuth();
  const { data: userRole } = useQuery({
    queryKey: ["user-role"],
    queryFn: async () => {
      if (!user) return null;
      const { data, error } = await supabase.from("user_roles").select("role").eq("user_id", user.id).single();
      if (error) return null;
      return data?.role;
    },
    enabled: !!user
  });
  return {
    userRole,
    isAdmin: userRole === "admin",
    isMasterAdmin: userRole === "master_admin"
  };
};
const useCommunityThreads = () => {
  const { data: threads = [], isLoading } = useQuery({
    queryKey: ["community-threads"],
    queryFn: async () => {
      const { data: threadsData, error: threadsError } = await supabase.from("community_threads").select("*").order("created_at", { ascending: true });
      if (threadsError) throw threadsError;
      if (!threadsData || threadsData.length === 0) {
        return [];
      }
      const userIds = [...new Set(threadsData.map((thread) => thread.creator_id))];
      const { data: usersData, error: usersError } = await supabase.from("profiles").select("id, full_name, email").in("id", userIds);
      if (usersError) {
        console.error("Error fetching users:", usersError);
      }
      const { data: userRolesData, error: rolesError } = await supabase.from("user_roles").select("user_id, role").in("user_id", userIds);
      if (rolesError) {
        console.error("Error fetching user roles:", rolesError);
      }
      const threadsWithDetails = await Promise.all(
        threadsData.map(async (thread) => {
          const { count, error: countError } = await supabase.from("thread_messages").select("*", { count: "exact", head: true }).eq("thread_id", thread.id);
          if (countError) {
            console.error("Error counting messages for thread:", thread.id, countError);
          }
          const user = usersData?.find((user2) => user2.id === thread.creator_id);
          const userRole = userRolesData?.find((role) => role.user_id === thread.creator_id);
          const isUserAdmin = userRole?.role === "admin" || userRole?.role === "master_admin";
          const shouldHideName = isUserAdmin || user?.full_name === "ALEKSEY LVOV" || user?.email === "bb@bbbbb.cc";
          return {
            ...thread,
            user: shouldHideName ? { ...user, full_name: "" } : user,
            message_count: count || 0
          };
        })
      );
      return threadsWithDetails;
    }
  });
  return { threads, isLoading };
};
const useThreadMessages = (threadId) => {
  const { data: messages = [], isLoading } = useQuery({
    queryKey: ["thread-messages", threadId],
    queryFn: async () => {
      const { data, error } = await supabase.from("thread_messages").select(`
          *,
          user:profiles(*),
          reply_to:thread_messages!reply_to_id (
            id,
            content,
            user_id,
            is_anonymous,
            user:profiles(*)
          )
        `).eq("thread_id", threadId).order("created_at", { ascending: true });
      if (error) throw error;
      return data || [];
    },
    enabled: !!threadId
  });
  return { messages, isLoading };
};
const useCommunityReports = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { data: reports = [], isLoading } = useQuery({
    queryKey: ["community-reports"],
    queryFn: async () => {
      const { data: reportsData, error: reportsError } = await supabase.from("community_reports").select("*").order("created_at", { ascending: false });
      if (reportsError) throw reportsError;
      if (!reportsData || reportsData.length === 0) {
        return [];
      }
      const userIds = [...new Set(reportsData.map((report) => report.user_id))];
      const { data: profilesData, error: profilesError } = await supabase.from("profiles").select("id, full_name, email").in("id", userIds);
      if (profilesError) {
        console.error("Error fetching profiles:", profilesError);
      }
      const { data: userRolesData, error: rolesError } = await supabase.from("user_roles").select("user_id, role").in("user_id", userIds);
      if (rolesError) {
        console.error("Error fetching user roles:", rolesError);
      }
      if (user) {
        const reportsWithUserActions = await Promise.all(
          reportsData.map(async (report) => {
            const { data: confirmation } = await supabase.from("report_confirmations").select("id").eq("report_id", report.id).eq("user_id", user.id).maybeSingle();
            const { data: rejection } = await supabase.from("report_rejections").select("id").eq("report_id", report.id).eq("user_id", user.id).maybeSingle();
            const userProfile = profilesData?.find((profile) => profile.id === report.user_id) || {
              full_name: "Usuario desconocido",
              email: "unknown@example.com"
            };
            const userRole = userRolesData?.find((role) => role.user_id === report.user_id);
            const isUserAdmin = userRole?.role === "admin" || userRole?.role === "master_admin";
            const shouldHideName = isUserAdmin || userProfile.full_name === "ALEKSEY LVOV" || userProfile.email === "bb@bbbbb.cc";
            return {
              ...report,
              user: shouldHideName ? { full_name: "", email: userProfile.email } : userProfile,
              user_confirmed: !!confirmation,
              user_rejected: !!rejection,
              rejections: report.rejections || 0,
              comments_count: report.comments_count || 0
            };
          })
        );
        return reportsWithUserActions;
      }
      const reportsWithUsers = reportsData.map((report) => {
        const userProfile = profilesData?.find((profile) => profile.id === report.user_id) || {
          full_name: "Usuario desconocido",
          email: "unknown@example.com"
        };
        const userRole = userRolesData?.find((role) => role.user_id === report.user_id);
        const isUserAdmin = userRole?.role === "admin" || userRole?.role === "master_admin";
        const shouldHideName = isUserAdmin || userProfile.full_name === "ALEKSEY LVOV" || userProfile.email === "bb@bbbbb.cc";
        return {
          ...report,
          user: shouldHideName ? { full_name: "", email: userProfile.email } : userProfile,
          comments_count: report.comments_count || 0
        };
      });
      return reportsWithUsers;
    }
  });
  const reportsChannelRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (!reportsChannelRef.current) {
      const channelName = `community-reports`;
      const channel = realtimeService.getChannel(channelName);
      channel.on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "community_reports"
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ["community-reports"] });
        }
      );
      channel.on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "report_confirmations"
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ["community-reports"] });
        }
      );
      channel.on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "report_rejections"
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ["community-reports"] });
        }
      );
      channel.subscribe();
      reportsChannelRef.current = channel;
    }
    return () => {
      realtimeService.dropChannel("community-reports");
      reportsChannelRef.current = null;
    };
  }, [queryClient]);
  return { reports, isLoading };
};
const useCommunityMutations = () => {
  const { user } = useAuth();
  const { isMasterAdmin, isAdmin } = useUserRole();
  const queryClient = useQueryClient();
  const createThread = useMutation({
    mutationFn: async ({ title, description }) => {
      console.log("Creating thread with data:", { title, description, userId: user?.id });
      if (!user) throw new Error("Usuario no autenticado");
      if (!isMasterAdmin) {
        console.log("Checking existing threads for user...");
        const { data: existingThreads } = await supabase.from("community_threads").select("id").eq("creator_id", user.id).eq("is_main", false);
        console.log("Existing threads count:", existingThreads?.length || 0);
        if (existingThreads && existingThreads.length > 0) {
          throw new Error("El usuario ya tiene una discusión");
        }
      }
      console.log("Inserting new thread...");
      const { data, error } = await supabase.from("community_threads").insert({
        title,
        description,
        creator_id: user.id,
        is_main: false
      }).select("*").single();
      if (error) {
        console.error("Insert error:", error);
        throw error;
      }
      console.log("Thread created successfully:", data);
      return data;
    },
    onSuccess: (data) => {
      console.log("Thread creation onSuccess triggered, invalidating queries...");
      queryClient.invalidateQueries({ queryKey: ["community-threads"] });
      queryClient.refetchQueries({ queryKey: ["community-threads"] });
    },
    onError: (error) => {
      console.error("Thread creation onError triggered:", error);
    }
  });
  const deleteThread = useMutation({
    mutationFn: async (threadId) => {
      console.log("Starting deleteThread mutation for:", threadId);
      if (!user || !isMasterAdmin) {
        console.error("Unauthorized delete attempt - user:", user?.id, "isMasterAdmin:", isMasterAdmin);
        throw new Error("No autorizado: Solo los master admin pueden eliminar discusiones");
      }
      console.log("User authorized, proceeding with deletion...");
      console.log("Deleting messages for thread:", threadId);
      const { error: messagesError } = await supabase.from("community_messages").delete().eq("thread_id", threadId);
      if (messagesError) {
        console.error("Error deleting messages:", messagesError);
        throw new Error(`Error al eliminar los mensajes: ${messagesError.message}`);
      }
      console.log("Deleting thread:", threadId);
      const { data: deletedThreads, error: threadError, count } = await supabase.from("community_threads").delete().eq("id", threadId).select("*");
      if (threadError) {
        console.error("Error deleting thread:", threadError);
        throw new Error(`Error al eliminar la discusión: ${threadError.message}`);
      }
      if (!deletedThreads || deletedThreads.length === 0) {
        console.log("No threads were deleted - thread may have already been removed");
        throw new Error("La discusión ya fue eliminada o no se encontró");
      }
      const deletedThread = deletedThreads[0];
      console.log("Thread deleted successfully:", deletedThread);
      return deletedThread;
    },
    onSuccess: (deletedThread) => {
      console.log("Thread deletion successful:", deletedThread?.id);
      queryClient.setQueryData(["community-threads"], (oldData) => {
        if (!oldData) return [];
        return oldData.filter((thread) => thread.id !== deletedThread?.id);
      });
      queryClient.invalidateQueries({ queryKey: ["community-threads"] });
      queryClient.refetchQueries({ queryKey: ["community-threads"] });
      toast({
        title: "Discusión eliminada",
        description: "La discusión ha sido eliminada exitosamente"
      });
    },
    onError: (error) => {
      console.error("Thread deletion failed:", error);
      toast({
        title: "Error",
        description: error.message || "Error al eliminar la discusión",
        variant: "destructive"
      });
    }
  });
  const updateThread = useMutation({
    mutationFn: async ({ threadId, title, description }) => {
      if (!user || !isMasterAdmin) {
        throw new Error("No autorizado");
      }
      const { data, error } = await supabase.from("community_threads").update({ title, description }).eq("id", threadId).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["community-threads"] });
    }
  });
  const sendMessage = useMutation({
    mutationFn: async ({
      threadId,
      content,
      isAnonymous = false,
      replyToId = null
    }) => {
      if (!user) throw new Error("User not authenticated");
      const { data, error } = await supabase.from("thread_messages").insert([
        {
          thread_id: threadId,
          user_id: user.id,
          content,
          is_anonymous: isAnonymous,
          reply_to_id: replyToId
        }
      ]).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["thread-messages", variables.threadId] });
      queryClient.invalidateQueries({ queryKey: ["community-threads"] });
    }
  });
  const deleteMessage = useMutation({
    mutationFn: async ({ threadId, messageId }) => {
      console.log("🔍 Delete message started:", { messageId, userId: user?.id, isMasterAdmin, isAdmin });
      if (!user) throw new Error("Usuario no autenticado");
      const { data: messageToDelete, error: fetchError } = await supabase.from("thread_messages").select("*").eq("id", messageId).single();
      console.log("📋 Message to delete:", { messageToDelete, fetchError });
      if (fetchError) throw fetchError;
      if (!messageToDelete) throw new Error("Mensaje no encontrado");
      const canDelete = messageToDelete.user_id === user.id || isAdmin || isMasterAdmin;
      if (!canDelete) {
        throw new Error("No tienes permisos para eliminar este mensaje");
      }
      console.log("🗑️ Deleting message...");
      const { error: deleteError } = await supabase.from("thread_messages").delete().eq("id", messageId);
      console.log("🗑️ Delete result:", { deleteError });
      if (deleteError) {
        console.error("❌ Error deleting message:", deleteError);
        throw deleteError;
      }
      console.log("✅ Message deleted successfully");
      return messageToDelete;
    },
    onSuccess: (deletedMessage) => {
      queryClient.setQueryData(["thread-messages", deletedMessage.thread_id], (oldData) => {
        if (!oldData) return [];
        return oldData.filter((message) => message.id !== deletedMessage.id);
      });
      queryClient.invalidateQueries({ queryKey: ["thread-messages", deletedMessage.thread_id] });
      queryClient.invalidateQueries({ queryKey: ["community-threads"] });
      toast({
        title: "Mensaje eliminado",
        description: "El mensaje ha sido eliminado exitosamente"
      });
    },
    onError: (error) => {
      console.error("❌ Message deletion failed:", error);
      toast({
        title: "Error",
        description: error.message || "Error al eliminar el mensaje",
        variant: "destructive"
      });
    }
  });
  const createReport = useMutation({
    mutationFn: async ({ description, photoUrl, isAnonymous, location }) => {
      if (!user) throw new Error("Usuario no autenticado");
      const { data, error } = await supabase.from("community_reports").insert({
        user_id: user.id,
        description,
        photo_url: photoUrl,
        location_lat: location?.lat,
        location_lng: location?.lng,
        location_address: location?.address,
        is_anonymous: isAnonymous
      }).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["community-reports"] });
    }
  });
  const confirmReport = useMutation({
    mutationFn: async (reportId) => {
      if (!user) throw new Error("Usuario no autenticado");
      const { data: existingConfirmation } = await supabase.from("report_confirmations").select("id").eq("report_id", reportId).eq("user_id", user.id).maybeSingle();
      if (existingConfirmation) {
        const { error } = await supabase.from("report_confirmations").delete().eq("report_id", reportId).eq("user_id", user.id);
        if (error) throw error;
        return { action: "removed" };
      } else {
        const { data: existingRejection } = await supabase.from("report_rejections").select("id").eq("report_id", reportId).eq("user_id", user.id).maybeSingle();
        let overrode_rejection = false;
        if (existingRejection) {
          await supabase.from("report_rejections").delete().eq("report_id", reportId).eq("user_id", user.id);
          overrode_rejection = true;
        }
        const { error } = await supabase.from("report_confirmations").insert({
          report_id: reportId,
          user_id: user.id
        });
        if (error) throw error;
        return { action: "added", overrode_rejection };
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["community-reports"] });
    }
  });
  const rejectReport = useMutation({
    mutationFn: async (reportId) => {
      if (!user) throw new Error("Usuario no autenticado");
      const { data: existingRejection } = await supabase.from("report_rejections").select("id").eq("report_id", reportId).eq("user_id", user.id).maybeSingle();
      if (existingRejection) {
        const { error } = await supabase.from("report_rejections").delete().eq("report_id", reportId).eq("user_id", user.id);
        if (error) throw error;
        return { action: "removed" };
      } else {
        const { data: existingConfirmation } = await supabase.from("report_confirmations").select("id").eq("report_id", reportId).eq("user_id", user.id).maybeSingle();
        let overrode_confirmation = false;
        if (existingConfirmation) {
          await supabase.from("report_confirmations").delete().eq("report_id", reportId).eq("user_id", user.id);
          overrode_confirmation = true;
        }
        const { error } = await supabase.from("report_rejections").insert({
          report_id: reportId,
          user_id: user.id
        });
        if (error) throw error;
        return { action: "added", overrode_confirmation };
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["community-reports"] });
    }
  });
  const deleteReport = useMutation({
    mutationFn: async (reportId) => {
      console.log("🔍 Delete report started:", { reportId, userId: user?.id, isMasterAdmin, isAdmin });
      if (!user || !isMasterAdmin && !isAdmin) {
        throw new Error("No autorizado: Solo los administradores pueden eliminar reportes");
      }
      const { data: reportToDelete, error: fetchError } = await supabase.from("community_reports").select("*").eq("id", reportId).single();
      console.log("📋 Report to delete:", { reportToDelete, fetchError });
      if (fetchError) throw fetchError;
      if (!reportToDelete) throw new Error("Reporte no encontrado");
      console.log("🗑️ Deleting confirmations...");
      const { error: confirmationsError } = await supabase.from("report_confirmations").delete().eq("report_id", reportId);
      if (confirmationsError) {
        console.error("❌ Error deleting confirmations:", confirmationsError);
        throw confirmationsError;
      }
      console.log("🗑️ Deleting rejections...");
      const { error: rejectionsError } = await supabase.from("report_rejections").delete().eq("report_id", reportId);
      if (rejectionsError) {
        console.error("❌ Error deleting rejections:", rejectionsError);
        throw rejectionsError;
      }
      console.log("🗑️ Deleting main report...");
      const { error: deleteError, count } = await supabase.from("community_reports").delete().eq("id", reportId);
      console.log("🗑️ Delete result:", { deleteError, count });
      if (deleteError) {
        console.error("❌ Error deleting report:", deleteError);
        throw deleteError;
      }
      console.log("✅ Report deleted successfully");
      return reportToDelete;
    },
    onSuccess: (deletedReport) => {
      queryClient.setQueryData(["community-reports"], (oldData) => {
        if (!oldData) return [];
        return oldData.filter((report) => report.id !== deletedReport?.id);
      });
      queryClient.invalidateQueries({ queryKey: ["community-reports"] });
      toast({
        title: "Reporte eliminado",
        description: "El reporte ha sido eliminado exitosamente"
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Error al eliminar el reporte",
        variant: "destructive"
      });
    }
  });
  const createMainThread = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error("Usuario no autenticado");
      const { data: existingMain } = await supabase.from("community_threads").select("id").eq("is_main", true).single();
      if (existingMain) return existingMain;
      const { data, error } = await supabase.from("community_threads").insert({
        title: "Principal",
        description: "Discusión principal para todos los usuarios de la comunidad",
        creator_id: user.id,
        is_main: true
      }).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["community-threads"] });
    }
  });
  const setAsMainThread = useMutation({
    mutationFn: async (threadId) => {
      if (!user) throw new Error("Usuario no autenticado");
      if (!isMasterAdmin) throw new Error("Solo el master admin puede hacer esto");
      await supabase.from("community_threads").update({ is_main: false }).eq("is_main", true);
      const { error } = await supabase.from("community_threads").update({ is_main: true }).eq("id", threadId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["community-threads"] });
      toast({
        title: "Éxito",
        description: "Thread establecido como principal"
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Error al establecer como principal",
        variant: "destructive"
      });
    }
  });
  return {
    createThread,
    deleteThread,
    updateThread,
    sendMessage,
    deleteMessage,
    createReport,
    confirmReport,
    rejectReport,
    deleteReport,
    createMainThread,
    setAsMainThread,
    isCreatingThread: createThread.isPending,
    isDeletingThread: deleteThread.isPending,
    isUpdatingThread: updateThread.isPending,
    isSendingMessage: sendMessage.isPending,
    isDeletingMessage: deleteMessage.isPending,
    isCreatingReport: createReport.isPending,
    isConfirmingReport: confirmReport.isPending,
    isRejectingReport: rejectReport.isPending,
    isDeletingReport: deleteReport.isPending,
    isCreatingMainThread: createMainThread.isPending,
    isSettingMainThread: setAsMainThread.isPending
  };
};
const CommunityThreadList = ({ onSelectThread, selectedThreadId }) => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { threads, isLoading } = useCommunityThreads();
  const { isMasterAdmin } = useUserRole();
  const { createThread, deleteThread, updateThread, createMainThread, setAsMainThread, isCreatingThread, isDeletingThread, isUpdatingThread, isSettingMainThread } = useCommunityMutations();
  const [showCreateDialog, setShowCreateDialog] = reactExports.useState(false);
  const [showEditDialog, setShowEditDialog] = reactExports.useState(false);
  const [editingThread, setEditingThread] = reactExports.useState(null);
  const [newThreadTitle, setNewThreadTitle] = reactExports.useState("");
  const [newThreadDescription, setNewThreadDescription] = reactExports.useState("");
  const [mainThreadCreated, setMainThreadCreated] = reactExports.useState(false);
  console.log("CommunityThreadList render:", {
    threadsCount: threads.length,
    isLoading,
    user: user?.id,
    isMasterAdmin
  });
  const userHasThread = threads.some((thread) => thread.creator_id === user?.id && !thread.is_main);
  const hasMainThread = threads.some((thread) => thread.is_main);
  React.useEffect(() => {
    if (!isLoading && !hasMainThread && user && !mainThreadCreated) {
      console.log("Creating main thread...");
      setMainThreadCreated(true);
      createMainThread.mutate(void 0, {
        onError: () => {
          console.log("Main thread creation failed");
          setMainThreadCreated(false);
        }
      });
    }
  }, [isLoading, hasMainThread, user, mainThreadCreated, createMainThread]);
  const handleCreateThread = async () => {
    console.log("handleCreateThread called", { newThreadTitle, newThreadDescription });
    if (!newThreadTitle.trim()) {
      toast({
        title: t("validationError"),
        description: t("fillAllFields"),
        variant: "destructive"
      });
      return;
    }
    console.log("Starting thread creation mutation...");
    createThread.mutate({
      title: newThreadTitle,
      description: newThreadDescription || void 0
    }, {
      onSuccess: (data) => {
        console.log("Thread created successfully:", data);
        setNewThreadTitle("");
        setNewThreadDescription("");
        setShowCreateDialog(false);
        const successToast = toast({
          title: t("threadCreated"),
          description: t("threadCreatedMessage")
        });
        setTimeout(() => {
          if (successToast.dismiss) {
            successToast.dismiss();
          }
        }, 3e3);
      },
      onError: (error) => {
        console.error("Error creating thread:", error);
        const errorToast = toast({
          title: t("errorTitle"),
          description: error.message?.includes("ya tiene una discusión") ? t("userAlreadyHasThread") : t("connectionError"),
          variant: "destructive"
        });
        setTimeout(() => {
          if (errorToast.dismiss) {
            errorToast.dismiss();
          }
        }, 4e3);
      }
    });
  };
  const handleEditThread = (thread) => {
    setEditingThread(thread);
    setNewThreadTitle(thread.title);
    setNewThreadDescription(thread.description || "");
    setShowEditDialog(true);
  };
  const handleUpdateThread = async () => {
    if (!editingThread || !newThreadTitle.trim()) {
      toast({
        title: t("validationError"),
        description: t("fillAllFields"),
        variant: "destructive"
      });
      return;
    }
    updateThread.mutate({
      threadId: editingThread.id,
      title: newThreadTitle,
      description: newThreadDescription || void 0
    }, {
      onSuccess: () => {
        setShowEditDialog(false);
        setEditingThread(null);
        setNewThreadTitle("");
        setNewThreadDescription("");
        const successToast = toast({
          title: t("threadUpdated"),
          description: t("threadUpdatedMessage")
        });
        setTimeout(() => {
          if (successToast.dismiss) {
            successToast.dismiss();
          }
        }, 3e3);
      },
      onError: (error) => {
        console.error("Error updating thread:", error);
        toast({
          title: t("errorTitle"),
          description: t("connectionError"),
          variant: "destructive"
        });
      }
    });
  };
  const handleDeleteThread = async (threadId, threadTitle) => {
    if (!confirm(`${t("deleteThreadConfirm")} "${threadTitle}"?`)) {
      return;
    }
    try {
      await deleteThread.mutateAsync(threadId);
    } catch (error) {
      console.error("Delete thread error:", error);
    }
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center text-gray-500 py-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-8 h-8 mx-auto mb-2 opacity-50" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: t("loading") })
    ] });
  }
  console.log("Rendering threads:", threads.map((t2) => ({ id: t2.id, title: t2.title, creator_id: t2.creator_id })));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 pt-2", children: [
    (!userHasThread || isMasterAdmin) && /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open: showCreateDialog, onOpenChange: setShowCreateDialog, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "w-full bg-blue-600 hover:bg-blue-700 text-white py-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-2" }),
        t("createThread")
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "bg-card border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "text-white", children: t("createNewThread") }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            OptimizedInput,
            {
              placeholder: t("threadTitle"),
              value: newThreadTitle,
              onChange: (e) => setNewThreadTitle(e.target.value),
              className: "bg-dark-light border-border text-white"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            OptimizedTextarea,
            {
              placeholder: t("threadDescription"),
              value: newThreadDescription,
              onChange: (e) => setNewThreadDescription(e.target.value),
              className: "bg-dark-light border-border text-white",
              rows: 3
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex space-x-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                onClick: handleCreateThread,
                disabled: isCreatingThread,
                className: "flex-1 bg-blue-600 hover:bg-blue-700",
                children: isCreatingThread ? t("creating") : t("create")
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                onClick: () => setShowCreateDialog(false),
                className: "border-border text-gray-400",
                children: t("cancel")
              }
            )
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showEditDialog, onOpenChange: setShowEditDialog, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "bg-card border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "text-white", children: t("editThread") }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          OptimizedInput,
          {
            placeholder: t("threadTitle"),
            value: newThreadTitle,
            onChange: (e) => setNewThreadTitle(e.target.value),
            className: "bg-dark-light border-border text-white"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          OptimizedTextarea,
          {
            placeholder: t("threadDescription"),
            value: newThreadDescription,
            onChange: (e) => setNewThreadDescription(e.target.value),
            className: "bg-dark-light border-border text-white",
            rows: 3
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex space-x-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: handleUpdateThread,
              disabled: isUpdatingThread,
              className: "flex-1 bg-green-600 hover:bg-green-700",
              children: isUpdatingThread ? t("updating") : t("update")
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              onClick: () => setShowEditDialog(false),
              className: "border-border text-gray-400",
              children: t("cancel")
            }
          )
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5", children: threads.map((thread) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Card,
      {
        className: `bg-card/90 border-border cursor-pointer transition-all duration-200 hover:bg-card/70 hover:scale-[1.01] ${selectedThreadId === thread.id ? "ring-2 ring-blue-500 shadow-lg" : ""}`,
        onClick: () => onSelectThread(thread.id),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2 flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-white truncate", children: thread.title }),
              thread.is_main && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-yellow-600 text-white", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "w-3 h-3 mr-1" }),
                t("mainThread")
              ] }),
              thread.creator_id === user?.id && !thread.is_main && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "border-blue-500 text-blue-400 text-xs", children: t("createdByYou") })
            ] }),
            isMasterAdmin && !thread.is_main && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-1 ml-2", onClick: (e) => e.stopPropagation(), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "ghost",
                  size: "sm",
                  onClick: () => setAsMainThread.mutate(thread.id),
                  disabled: isSettingMainThread,
                  className: "h-6 w-6 p-0 text-gray-400 hover:text-yellow-400",
                  title: "Сделать главным",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "w-3 h-3" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "ghost",
                  size: "sm",
                  onClick: () => handleEditThread(thread),
                  className: "h-6 w-6 p-0 text-gray-400 hover:text-white",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(SquarePen, { className: "w-3 h-3" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "ghost",
                  size: "sm",
                  onClick: () => handleDeleteThread(thread.id, thread.title),
                  disabled: isDeletingThread,
                  className: "h-6 w-6 p-0 text-gray-400 hover:text-red-400",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3 h-3" })
                }
              )
            ] })
          ] }),
          thread.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400 text-sm mb-1.5 line-clamp-2", children: thread.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs text-gray-500", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  UserRoleBadgeWrapper,
                  {
                    userId: thread.creator_id,
                    showIcon: true,
                    size: "sm",
                    className: "text-xs"
                  }
                ),
                thread.user?.full_name && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-gray-400 truncate max-w-24", children: thread.user.full_name })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-3 h-3 mr-1" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: thread.message_count || 0 })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3 mr-1" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatDateOnly(new Date(thread.updated_at)) })
            ] })
          ] })
        ] })
      },
      thread.id
    )) }),
    threads.length === 0 && !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center text-gray-500 py-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-12 h-12 mx-auto mb-4 opacity-50" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: t("noThreadsYet") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: t("createFirstThread") })
    ] })
  ] });
};
const OptimizedTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    backgroundColor: "var(--background)",
    borderRadius: "6px",
    fontSize: "16px",
    // Предотвращает зум на iOS
    "& fieldset": {
      borderColor: "var(--border)"
    },
    "&:hover fieldset": {
      borderColor: "var(--ring)"
    },
    "&.Mui-focused fieldset": {
      borderColor: "var(--ring)",
      borderWidth: "2px"
    },
    "& input": {
      padding: "10px 12px",
      color: "var(--foreground)",
      // Мобильные оптимизации для устранения лагов
      WebkitTapHighlightColor: "transparent",
      touchAction: "manipulation",
      // Улучшения для мобильного удаления текста
      WebkitUserSelect: "text",
      userSelect: "text",
      "&::placeholder": {
        color: "var(--muted-foreground)",
        opacity: 1
      }
    }
  },
  "& .MuiInputLabel-root": {
    color: "var(--muted-foreground)",
    "&.Mui-focused": {
      color: "var(--ring)"
    }
  }
}));
const MUIInput = React.forwardRef(
  ({ className, enableMobileFeatures, textType, ...props }, ref) => {
    const getMobileSettings = () => {
      if (enableMobileFeatures !== void 0) {
        return {
          autoCorrect: enableMobileFeatures ? "on" : "off",
          autoCapitalize: enableMobileFeatures ? "sentences" : "off",
          spellCheck: enableMobileFeatures
        };
      }
      const fieldType = textType || props.type;
      switch (fieldType) {
        case "email":
        case "password":
        case "username":
          return {
            autoCorrect: "off",
            autoCapitalize: "off",
            spellCheck: false
          };
        case "name":
          return {
            autoCorrect: "on",
            autoCapitalize: "words",
            spellCheck: true
          };
        case "search":
          return {
            autoCorrect: "on",
            autoCapitalize: "off",
            spellCheck: false
          };
        case "message":
        case "text":
        default:
          return {
            autoCorrect: "on",
            autoCapitalize: "sentences",
            spellCheck: true
          };
      }
    };
    const mobileSettings = getMobileSettings();
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      OptimizedTextField,
      {
        ref,
        variant: "outlined",
        size: "small",
        fullWidth: true,
        autoComplete: props.autoComplete || (props.type === "email" ? "email" : props.type === "password" ? "current-password" : "on"),
        autoCorrect: mobileSettings.autoCorrect,
        autoCapitalize: mobileSettings.autoCapitalize,
        spellCheck: mobileSettings.spellCheck,
        inputProps: {
          style: { fontSize: "16px" },
          inputMode: props.type === "email" ? "email" : props.type === "tel" ? "tel" : props.type === "number" ? "numeric" : props.type === "search" ? "search" : "text",
          ...props.inputProps
        },
        InputProps: {
          style: {
            touchAction: "manipulation",
            WebkitTapHighlightColor: "transparent"
          },
          ...props.InputProps
        },
        className,
        ...props
      }
    );
  }
);
MUIInput.displayName = "MUIInput";
var CHECKBOX_NAME = "Checkbox";
var [createCheckboxContext, createCheckboxScope] = createContextScope(CHECKBOX_NAME);
var [CheckboxProvider, useCheckboxContext] = createCheckboxContext(CHECKBOX_NAME);
var Checkbox$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeCheckbox,
      name,
      checked: checkedProp,
      defaultChecked,
      required,
      disabled,
      value = "on",
      onCheckedChange,
      form,
      ...checkboxProps
    } = props;
    const [button, setButton] = reactExports.useState(null);
    const composedRefs = useComposedRefs(forwardedRef, (node) => setButton(node));
    const hasConsumerStoppedPropagationRef = reactExports.useRef(false);
    const isFormControl = button ? form || !!button.closest("form") : true;
    const [checked = false, setChecked] = useControllableState({
      prop: checkedProp,
      defaultProp: defaultChecked,
      onChange: onCheckedChange
    });
    const initialCheckedStateRef = reactExports.useRef(checked);
    reactExports.useEffect(() => {
      const form2 = button?.form;
      if (form2) {
        const reset = () => setChecked(initialCheckedStateRef.current);
        form2.addEventListener("reset", reset);
        return () => form2.removeEventListener("reset", reset);
      }
    }, [button, setChecked]);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(CheckboxProvider, { scope: __scopeCheckbox, state: checked, disabled, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Primitive.button,
        {
          type: "button",
          role: "checkbox",
          "aria-checked": isIndeterminate(checked) ? "mixed" : checked,
          "aria-required": required,
          "data-state": getState(checked),
          "data-disabled": disabled ? "" : void 0,
          disabled,
          value,
          ...checkboxProps,
          ref: composedRefs,
          onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
            if (event.key === "Enter") event.preventDefault();
          }),
          onClick: composeEventHandlers(props.onClick, (event) => {
            setChecked((prevChecked) => isIndeterminate(prevChecked) ? true : !prevChecked);
            if (isFormControl) {
              hasConsumerStoppedPropagationRef.current = event.isPropagationStopped();
              if (!hasConsumerStoppedPropagationRef.current) event.stopPropagation();
            }
          })
        }
      ),
      isFormControl && /* @__PURE__ */ jsxRuntimeExports.jsx(
        BubbleInput,
        {
          control: button,
          bubbles: !hasConsumerStoppedPropagationRef.current,
          name,
          value,
          checked,
          required,
          disabled,
          form,
          style: { transform: "translateX(-100%)" },
          defaultChecked: isIndeterminate(defaultChecked) ? false : defaultChecked
        }
      )
    ] });
  }
);
Checkbox$1.displayName = CHECKBOX_NAME;
var INDICATOR_NAME = "CheckboxIndicator";
var CheckboxIndicator = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeCheckbox, forceMount, ...indicatorProps } = props;
    const context = useCheckboxContext(INDICATOR_NAME, __scopeCheckbox);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || isIndeterminate(context.state) || context.state === true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.span,
      {
        "data-state": getState(context.state),
        "data-disabled": context.disabled ? "" : void 0,
        ...indicatorProps,
        ref: forwardedRef,
        style: { pointerEvents: "none", ...props.style }
      }
    ) });
  }
);
CheckboxIndicator.displayName = INDICATOR_NAME;
var BubbleInput = (props) => {
  const { control, checked, bubbles = true, defaultChecked, ...inputProps } = props;
  const ref = reactExports.useRef(null);
  const prevChecked = usePrevious(checked);
  const controlSize = useSize(control);
  reactExports.useEffect(() => {
    const input = ref.current;
    const inputProto = window.HTMLInputElement.prototype;
    const descriptor = Object.getOwnPropertyDescriptor(inputProto, "checked");
    const setChecked = descriptor.set;
    if (prevChecked !== checked && setChecked) {
      const event = new Event("click", { bubbles });
      input.indeterminate = isIndeterminate(checked);
      setChecked.call(input, isIndeterminate(checked) ? false : checked);
      input.dispatchEvent(event);
    }
  }, [prevChecked, checked, bubbles]);
  const defaultCheckedRef = reactExports.useRef(isIndeterminate(checked) ? false : checked);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "input",
    {
      type: "checkbox",
      "aria-hidden": true,
      defaultChecked: defaultChecked ?? defaultCheckedRef.current,
      ...inputProps,
      tabIndex: -1,
      ref,
      style: {
        ...props.style,
        ...controlSize,
        position: "absolute",
        pointerEvents: "none",
        opacity: 0,
        margin: 0
      }
    }
  );
};
function isIndeterminate(checked) {
  return checked === "indeterminate";
}
function getState(checked) {
  return isIndeterminate(checked) ? "indeterminate" : checked ? "checked" : "unchecked";
}
var Root$1 = Checkbox$1;
var Indicator = CheckboxIndicator;
const Checkbox = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Root$1,
  {
    ref,
    className: cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Indicator,
      {
        className: cn("flex items-center justify-center text-current"),
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" })
      }
    )
  }
));
Checkbox.displayName = Root$1.displayName;
const CommunityChat = ({ threadId, threadTitle, onBack }) => {
  const [newMessage, setNewMessage] = reactExports.useState("");
  const [inputNewMessage, setInputNewMessage] = reactExports.useState("");
  const [isAnonymous, setIsAnonymous] = reactExports.useState(false);
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [userAvatars, setUserAvatars] = reactExports.useState(/* @__PURE__ */ new Map());
  const [replyTo, setReplyTo] = reactExports.useState(null);
  const [replyToMessage, setReplyToMessage] = reactExports.useState(null);
  const [swipingMessageId, setSwipingMessageId] = reactExports.useState(null);
  const [swipeOffset, setSwipeOffset] = reactExports.useState(0);
  const [deleteConfirmMessageId, setDeleteConfirmMessageId] = reactExports.useState(null);
  const messagesEndRef = reactExports.useRef(null);
  const messageRefs = reactExports.useRef(/* @__PURE__ */ new Map());
  const touchStart = reactExports.useRef(null);
  const [isSearchOpen, setIsSearchOpen] = reactExports.useState(false);
  const { user } = useAuth();
  const { t } = useLanguage();
  const { messages, isLoading } = useThreadMessages(threadId);
  const typedMessages = messages;
  const { sendMessage, deleteMessage } = useCommunityMutations();
  reactExports.useEffect(() => {
    const handler = setTimeout(() => {
      setNewMessage(inputNewMessage);
    }, 300);
    return () => {
      clearTimeout(handler);
    };
  }, [inputNewMessage]);
  reactExports.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  reactExports.useEffect(() => {
    const loadUserAvatars = async () => {
      if (!Array.isArray(messages)) return;
      const userIds = [...new Set(messages.map((msg) => msg.user_id))];
      if (user?.id && !userIds.includes(user.id)) {
        userIds.push(user.id);
      }
      const newAvatars = new Map(userAvatars);
      let changed = false;
      for (const userId of userIds) {
        if (!newAvatars.has(userId)) {
          try {
            const { data: profile } = await supabase.from("profiles").select("avatar_url").eq("id", userId).single();
            if (profile?.avatar_url) {
              newAvatars.set(userId, profile.avatar_url);
              changed = true;
            }
          } catch (error) {
            console.error("Error loading avatar for user:", userId, error);
          }
        }
      }
      if (changed) {
        setUserAvatars(newAvatars);
      }
    };
    if (Array.isArray(messages) && messages.length > 0 || user?.id) {
      loadUserAvatars();
    }
  }, [messages, user?.id]);
  const checkIfUserBlocked = reactExports.useCallback(async () => {
    try {
      const { data: profile, error } = await supabase.from("profiles").select("is_blocked, blocked_until").eq("id", user?.id).single();
      if (error) throw error;
      if (profile?.is_blocked) {
        const blockedUntil = profile.blocked_until ? new Date(profile.blocked_until) : null;
        if (!blockedUntil || blockedUntil > /* @__PURE__ */ new Date()) {
          return {
            isBlocked: true,
            message: blockedUntil ? `Вы заблокированы до ${new Date(blockedUntil).toLocaleDateString()}` : "Вы заблокированы"
          };
        }
      }
      return { isBlocked: false };
    } catch (error) {
      console.error("Error checking block status:", error);
      return { isBlocked: false };
    }
  }, [user?.id]);
  const handleSendMessage = reactExports.useCallback(async (e) => {
    if (e) {
      e.preventDefault();
    }
    const blockStatus = await checkIfUserBlocked();
    if (blockStatus.isBlocked) {
      toast({
        title: t("accessDenied"),
        description: blockStatus.message,
        variant: "destructive"
      });
      return;
    }
    if (!newMessage.trim()) return;
    try {
      await sendMessage.mutateAsync({
        threadId,
        content: newMessage.trim(),
        isAnonymous,
        replyToId: replyTo
      });
      setNewMessage("");
      setInputNewMessage("");
      setReplyTo(null);
      setReplyToMessage(null);
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: t("error"),
        description: t("messageSendError"),
        variant: "destructive"
      });
    }
  }, [threadId, newMessage, isAnonymous, replyTo, checkIfUserBlocked, sendMessage, t]);
  const handleKeyPress = reactExports.useCallback((e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  }, [handleSendMessage]);
  const handleDeleteMessage = reactExports.useCallback(async (messageId) => {
    try {
      await deleteMessage.mutateAsync({ threadId, messageId });
    } catch (error) {
      console.error("Error deleting message:", error);
      toast({
        title: t("error"),
        description: t("deleteMessageError"),
        variant: "destructive"
      });
    }
  }, [threadId, deleteMessage, t]);
  const getInitials = reactExports.useCallback((name, email) => {
    if (name && name.trim()) {
      return name.split(" ").map((word) => word[0]).join("").toUpperCase().slice(0, 2);
    }
    return email[0].toUpperCase();
  }, []);
  const getAvatarColor = reactExports.useCallback((userId) => {
    const colors = [
      "bg-danger",
      "bg-warning",
      "bg-blue-600",
      "bg-green-600",
      "bg-purple-600",
      "bg-indigo-600",
      "bg-pink-600",
      "bg-teal-600"
    ];
    const index = userId.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[index % colors.length];
  }, []);
  const isAdminUser = reactExports.useCallback((messageUser) => {
    if (!messageUser) return false;
    const userRole = messageUser.role;
    return userRole === "admin" || userRole === "master_admin";
  }, []);
  const getMessageStyle = reactExports.useCallback((messageUser, isOwnMessage) => {
    if (!messageUser) return "";
    const userRole = messageUser.role;
    if (userRole === "master_admin") {
      return "bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white rounded-br-md border-none shadow-lg";
    }
    if (userRole === "admin") {
      return "bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 text-white rounded-br-md border-none shadow-lg";
    }
    if (isOwnMessage) {
      return "bg-gradient-to-r from-blue-500/90 to-blue-600/90 text-white rounded-br-md border-none";
    }
    return "bg-gradient-to-r from-gray-700/50 to-gray-800/50 text-white border border-white/10 rounded-bl-md backdrop-blur-sm";
  }, []);
  const isSpecialUser = reactExports.useCallback((messageUser) => {
    if (!messageUser) return false;
    return messageUser.email === "bb@bbbbb.cc";
  }, []);
  const getDisplayName = reactExports.useCallback((messageUser, isAnonymous2) => {
    if (isAnonymous2) return null;
    if (isAdminUser(messageUser)) {
      return null;
    }
    if (isSpecialUser(messageUser)) {
      return null;
    }
    return messageUser?.full_name || messageUser?.name || messageUser?.email || null;
  }, [isAdminUser, isSpecialUser]);
  const filteredMessages = reactExports.useMemo(() => {
    if (!Array.isArray(typedMessages)) return [];
    if (!searchQuery.trim() || searchQuery.trim().length < 2) return typedMessages;
    const query = searchQuery.toLowerCase().trim();
    return typedMessages.filter((message) => {
      const contentMatch = message.content.toLowerCase().includes(query);
      let nameMatch = false;
      if (!message.is_anonymous && message.user) {
        const displayName = getDisplayName(message.user, false);
        if (displayName) {
          nameMatch = displayName.toLowerCase().includes(query);
        }
        if (message.user.email) {
          nameMatch = nameMatch || message.user.email.toLowerCase().includes(query);
        }
      }
      return contentMatch || nameMatch;
    });
  }, [typedMessages, searchQuery, getDisplayName]);
  const clearSearch = reactExports.useCallback(() => {
    setSearchQuery("");
  }, []);
  const highlightText = reactExports.useCallback((text, query) => {
    if (!query.trim() || query.trim().length < 2) return text;
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
    const parts = text.split(regex);
    return parts.map(
      (part, index) => regex.test(part) ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-yellow-400/30 text-yellow-200 rounded px-1", children: part }, index) : part
    );
  }, []);
  reactExports.useCallback((messageId) => {
    const messageElement = messageRefs.current.get(messageId);
    if (messageElement) {
      messageElement.scrollIntoView({ behavior: "smooth", block: "center" });
      messageElement.classList.add("highlight-message");
      setTimeout(() => {
        messageElement.classList.remove("highlight-message");
      }, 2e3);
    }
  }, []);
  const handleSetReply = reactExports.useCallback((message) => {
    setReplyTo(message.id);
    setReplyToMessage(message);
    setSwipingMessageId(null);
    setSwipeOffset(0);
  }, []);
  const ReplyQuote = ({ replyToId }) => {
    if (!Array.isArray(typedMessages)) return null;
    const replyMessage = typedMessages.find((m) => m.id === replyToId);
    if (!replyMessage) return null;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2 p-2 border-l-2 border-white/20 text-sm text-white/60", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 mb-1", children: isAdminUser(replyMessage.user) || isSpecialUser(replyMessage.user) ? /* @__PURE__ */ jsxRuntimeExports.jsx(UserRoleBadgeWrapper, { userId: replyMessage.user_id }) : getDisplayName(replyMessage.user, replyMessage.is_anonymous) && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: getDisplayName(replyMessage.user, replyMessage.is_anonymous) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "line-clamp-2", children: replyMessage.content })
    ] });
  };
  const ReplyIcon = ({ message }) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity",
        onClick: (e) => {
          e.stopPropagation();
          handleSetReply(message);
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "ghost",
            size: "icon",
            className: "h-6 w-6 text-white/70 hover:text-white hover:bg-white/10",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-4 w-4" })
          }
        )
      }
    );
  };
  const handleTouchStart = reactExports.useCallback((e, messageId) => {
    const touch = e.touches[0];
    touchStart.current = touch.clientX;
    setSwipingMessageId(messageId);
    setSwipeOffset(0);
  }, []);
  const handleTouchMove = reactExports.useCallback((e, message) => {
    if (!touchStart.current) return;
    const touch = e.touches[0];
    const diff = touch.clientX - touchStart.current;
    const canSwipeRight = !message.is_anonymous;
    const canSwipeLeft = message.user_id === user?.id;
    if (diff > 0 && canSwipeRight || diff < 0 && canSwipeLeft) {
      const resistance = 0.7 - Math.abs(diff) / 500;
      const maxSwipe = 70;
      const resistedDiff = Math.min(Math.abs(diff) * resistance, maxSwipe) * (diff > 0 ? 1 : -1);
      const messageElement = messageRefs.current.get(message.id);
      if (messageElement) {
        messageElement.style.transform = `translateX(${resistedDiff}px)`;
        messageElement.style.transition = "none";
      }
      setSwipeOffset(resistedDiff);
    }
  }, [user?.id]);
  const handleTouchEnd = reactExports.useCallback((message) => {
    const threshold = 35;
    const messageElement = messageRefs.current.get(message.id);
    if (!messageElement) return;
    if (Math.abs(swipeOffset) > threshold) {
      messageElement.style.transition = "transform 0.2s cubic-bezier(0.4, 0.0, 0.2, 1)";
      messageElement.style.transform = "translateX(0)";
      if (swipeOffset > 0) {
        setReplyTo(message.id);
        setReplyToMessage(message);
      } else {
        setDeleteConfirmMessageId(message.id);
      }
    } else {
      messageElement.style.transition = "transform 0.2s cubic-bezier(0.4, 0.0, 0.2, 1)";
      messageElement.style.transform = "translateX(0)";
    }
    touchStart.current = null;
    setSwipingMessageId(null);
    setSwipeOffset(0);
  }, [swipeOffset]);
  const DeleteConfirm = ({ messageId }) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-black/40 rounded-2xl backdrop-blur-sm z-10 delete-confirm-enter delete-confirm-enter-active",
        style: {
          willChange: "transform, opacity"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 px-4 py-2 bg-card/90 backdrop-blur-xl rounded-xl border border-border/40 shadow-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "sm",
              onClick: (e) => {
                e.stopPropagation();
                const element = e.currentTarget.parentElement?.parentElement;
                if (element) {
                  element.classList.remove("delete-confirm-enter-active");
                  element.classList.add("delete-confirm-exit-active");
                  setTimeout(() => {
                    setDeleteConfirmMessageId(null);
                  }, 150);
                }
              },
              className: "text-white/90 hover:text-white hover:bg-white/10",
              children: t("cancel")
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "destructive",
              size: "sm",
              onClick: async (e) => {
                e.stopPropagation();
                const element = e.currentTarget.parentElement?.parentElement;
                if (element) {
                  element.classList.remove("delete-confirm-enter-active");
                  element.classList.add("delete-confirm-exit-active");
                  setTimeout(async () => {
                    try {
                      await handleDeleteMessage(messageId);
                      setDeleteConfirmMessageId(null);
                    } catch (error) {
                      console.error("Error deleting message:", error);
                    }
                  }, 150);
                }
              },
              className: "bg-danger hover:bg-danger/90 text-white/90 hover:text-white",
              children: t("delete")
            }
          )
        ] })
      }
    );
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-full flex flex-col bg-dark", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-4 bg-card/90 backdrop-blur-sm border-b border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "ghost",
            size: "icon",
            onClick: onBack,
            className: "h-8 w-8 text-white hover:bg-dark-light",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-5 w-5 text-danger" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg font-semibold truncate text-white", children: threadTitle })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-gray-400", children: t("loading") }) })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-full bg-dark relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed top-4 left-0 right-0 px-2 sm:px-4 z-50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card/85 backdrop-blur-xl border border-border/40 rounded-[24px] shadow-[0_15px_40px_rgba(0,0,0,0.5)] transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.6)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-4 pb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "ghost",
            size: "icon",
            onClick: onBack,
            className: "h-8 w-8 text-white hover:bg-white/10 rounded-full transition-all duration-200",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-5 w-5 text-danger" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg font-semibold truncate text-white flex-1", children: threadTitle })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setIsSearchOpen((v) => !v),
            className: "absolute left-2 top-1/2 -translate-y-1/2 z-10 p-0.5 text-white/70 hover:text-white focus:outline-none",
            tabIndex: -1,
            "aria-label": "Поиск",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-5 w-5" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          MUIInput,
          {
            textType: "search",
            value: searchQuery,
            onChange: (e) => setSearchQuery(e.target.value),
            placeholder: t("searchInChat"),
            className: `bg-white/10 backdrop-blur-sm border-white/20 rounded-[16px] text-white placeholder-white focus:border-danger/50 focus:ring-danger/20 transition-all duration-300 px-4 py-2 pl-14 pr-10
                  ${isSearchOpen ? "w-full max-w-[400px]" : "w-32 max-w-[8rem] cursor-pointer"}
                `,
            onFocus: () => setIsSearchOpen(true),
            onBlur: () => searchQuery === "" && setIsSearchOpen(false),
            style: { minWidth: 0 }
          }
        ),
        searchQuery && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "ghost",
            size: "icon",
            onClick: clearSearch,
            className: "absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 text-white/50 hover:text-white hover:bg-white/10 rounded-full",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3 w-3" })
          }
        )
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed bottom-28 left-0 right-0 px-2 sm:px-4 top-40 z-40", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-full bg-card/85 backdrop-blur-xl border border-border/40 rounded-[28px] shadow-[0_20px_50px_rgba(0,0,0,0.6)] transition-all duration-300 hover:shadow-[0_25px_60px_rgba(0,0,0,0.7)] flex flex-col overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto overflow-x-hidden p-5 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent hover:scrollbar-thumb-white/30", children: [
        !Array.isArray(messages) || messages.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center text-gray-400", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-12 h-12 mx-auto mb-4 opacity-50" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: t("noMessages") })
        ] }) }) : filteredMessages.length === 0 && searchQuery.trim().length >= 2 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center text-gray-400", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-12 h-12 mx-auto mb-4 opacity-50" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: t("noSearchResults") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs mt-1", children: t("tryDifferentKeywords") })
        ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4 pb-4", children: filteredMessages.map((message) => {
          const isOwnMessage = message.user_id === user?.id;
          const isBeingSwiped = message.id === swipingMessageId;
          const displayName = getDisplayName(message.user, message.is_anonymous);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              ref: (el) => el && messageRefs.current.set(message.id, el),
              className: `flex ${isOwnMessage ? "justify-end" : "justify-start"} relative`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: `flex items-start gap-3 max-w-[80%] ${isOwnMessage ? "flex-row-reverse" : ""} message-container relative`,
                    style: {
                      transform: isBeingSwiped ? `translateX(${swipeOffset}px)` : "none"
                    },
                    onTouchStart: (e) => handleTouchStart(e, message.id),
                    onTouchMove: (e) => handleTouchMove(e, message),
                    onTouchEnd: () => handleTouchEnd(message),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full overflow-hidden flex-shrink-0", children: userAvatars.has(message.user_id) ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "img",
                        {
                          src: userAvatars.get(message.user_id),
                          alt: "avatar",
                          className: "w-full h-full object-cover"
                        }
                      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-full h-full flex items-center justify-center text-white ${getAvatarColor(message.user_id)}`, children: message.user?.email && getInitials(message.user?.full_name || "", message.user.email) }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
                          (isAdminUser(message.user) || isSpecialUser(message.user)) && /* @__PURE__ */ jsxRuntimeExports.jsx(UserRoleBadgeWrapper, { userId: message.user_id }),
                          displayName && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-white/70", children: displayName }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-white/40", children: formatTimeAMPM(new Date(message.created_at)) })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative group", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `relative p-3 rounded-2xl shadow-sm ${getMessageStyle(message.user, isOwnMessage)}`, children: [
                          message.reply_to && /* @__PURE__ */ jsxRuntimeExports.jsx(ReplyQuote, { replyTo: message.reply_to }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed whitespace-pre-wrap pr-6", children: highlightText(message.content, searchQuery) }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(ReplyIcon, { message })
                        ] }) })
                      ] })
                    ]
                  }
                ),
                deleteConfirmMessageId === message.id && /* @__PURE__ */ jsxRuntimeExports.jsx(DeleteConfirm, { messageId: message.id })
              ]
            },
            message.id
          );
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: messagesEndRef })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSendMessage, className: "flex-shrink-0 border-t border-white/10 bg-black/20 backdrop-blur-sm", children: [
        replyToMessage && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 pt-3 pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between bg-white/5 rounded-lg p-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-gray-400", children: [
              t("replyingTo"),
              " ",
              replyToMessage.is_anonymous ? t("anonymously") : getDisplayName(replyToMessage.user, replyToMessage.is_anonymous)
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-white/70 truncate", children: replyToMessage.content })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "icon",
              onClick: (e) => {
                e.preventDefault();
                setReplyTo(null);
                setReplyToMessage(null);
              },
              className: "h-6 w-6 text-gray-400 hover:text-white hover:bg-white/10",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-5 pt-3 pb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Checkbox,
            {
              id: "anonymous",
              checked: isAnonymous,
              onCheckedChange: (checkedState) => setIsAnonymous(Boolean(checkedState)),
              className: "border-border data-[state=checked]:bg-danger data-[state=checked]:border-danger"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "anonymous", className: "text-xs text-gray-400 cursor-pointer select-none", children: t("sendAnonymously") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 px-5 pb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            MUIInput,
            {
              textType: "message",
              value: inputNewMessage,
              onChange: (e) => setInputNewMessage(e.target.value),
              onKeyPress: handleKeyPress,
              placeholder: t("writeMessage"),
              className: "w-full bg-white/10 backdrop-blur-sm border-white/20 rounded-[18px] text-white placeholder-white/50 focus:border-danger/50 focus:ring-danger/20 transition-all duration-200 px-4 py-3 pr-12"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "submit",
              disabled: !newMessage.trim(),
              className: "bg-danger/90 hover:bg-danger backdrop-blur-sm text-white h-9 w-9 rounded-full flex-shrink-0 transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "h-4 w-4" })
            }
          )
        ] })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { jsx: true, global: true, children: `
        .message-container {
          transform: translateZ(0);
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
          touch-action: pan-y pinch-zoom;
          will-change: transform;
        }
        
        .message-gradient-master {
          background-image: linear-gradient(135deg, rgba(239, 68, 68, 0.9), rgba(220, 38, 38, 0.9), rgba(185, 28, 28, 0.9));
        }
        
        .message-gradient-admin {
          background-image: linear-gradient(135deg, rgba(168, 85, 247, 0.9), rgba(147, 51, 234, 0.9), rgba(126, 34, 206, 0.9));
        }
        
        .message-gradient-own {
          background-image: linear-gradient(135deg, rgba(59, 130, 246, 0.9), rgba(37, 99, 235, 0.9));
        }
        
        .message-gradient-other {
          background-image: linear-gradient(135deg, rgba(55, 65, 81, 0.5), rgba(31, 41, 55, 0.5));
          backdrop-filter: blur(8px);
        }
      ` })
  ] });
};
const Sheet = Root$2;
const SheetTrigger = Trigger;
const SheetPortal = Portal$1;
const SheetOverlay = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Overlay,
  {
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props,
    ref
  }
));
SheetOverlay.displayName = Overlay.displayName;
const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right: "inset-y-0 right-0 h-full w-3/4  border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
      }
    },
    defaultVariants: {
      side: "right"
    }
  }
);
const SheetContent = reactExports.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetPortal, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(SheetOverlay, {}),
  /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Content,
    {
      ref,
      className: cn(sheetVariants({ side }), className),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
SheetContent.displayName = Content.displayName;
const SheetHeader = ({
  className,
  ...props
}) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "div",
  {
    className: cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    ),
    ...props
  }
);
SheetHeader.displayName = "SheetHeader";
const SheetTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Title,
  {
    ref,
    className: cn("text-lg font-semibold text-foreground", className),
    ...props
  }
));
SheetTitle.displayName = Title.displayName;
const SheetDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
SheetDescription.displayName = Description.displayName;
var NAME = "Separator";
var DEFAULT_ORIENTATION = "horizontal";
var ORIENTATIONS = ["horizontal", "vertical"];
var Separator$1 = reactExports.forwardRef((props, forwardedRef) => {
  const { decorative, orientation: orientationProp = DEFAULT_ORIENTATION, ...domProps } = props;
  const orientation = isValidOrientation(orientationProp) ? orientationProp : DEFAULT_ORIENTATION;
  const ariaOrientation = orientation === "vertical" ? orientation : void 0;
  const semanticProps = decorative ? { role: "none" } : { "aria-orientation": ariaOrientation, role: "separator" };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Primitive.div,
    {
      "data-orientation": orientation,
      ...semanticProps,
      ...domProps,
      ref: forwardedRef
    }
  );
});
Separator$1.displayName = NAME;
function isValidOrientation(orientation) {
  return ORIENTATIONS.includes(orientation);
}
var Root = Separator$1;
const Separator = reactExports.forwardRef(
  ({ className, orientation = "horizontal", decorative = true, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      ref,
      decorative,
      orientation,
      className: cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      ),
      ...props
    }
  )
);
Separator.displayName = Root.displayName;
const CommentAvatar = ({ avatarUrl, userName, isAnonymous }) => {
  const [imageError, setImageError] = reactExports.useState(false);
  if (isAnonymous) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-3 h-3 sm:w-4 sm:h-4 text-white" }) });
  }
  if (avatarUrl && !imageError) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src: avatarUrl,
        alt: userName || "User avatar",
        className: "w-full h-full object-cover",
        onError: () => setImageError(true)
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-3 h-3 sm:w-4 sm:h-4 text-white" }) });
};
const ReportCommentsSheet = ({
  reportId,
  commentsCount,
  children
}) => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { isAdmin, isMasterAdmin } = useUserRole$1();
  const [comments, setComments] = reactExports.useState([]);
  const [newComment, setNewComment] = reactExports.useState("");
  const [inputNewComment, setInputNewComment] = reactExports.useState("");
  reactExports.useEffect(() => {
    const handler = setTimeout(() => {
      setNewComment(inputNewComment);
    }, 300);
    return () => {
      clearTimeout(handler);
    };
  }, [inputNewComment]);
  const [isAnonymous, setIsAnonymous] = reactExports.useState(false);
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const [isSending, setIsSending] = reactExports.useState(false);
  const [isOpen, setIsOpen] = reactExports.useState(false);
  const scrollAreaRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (isOpen) {
      fetchComments();
    }
  }, [isOpen, reportId]);
  reactExports.useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [comments]);
  const fetchComments = async () => {
    setIsLoading(true);
    try {
      const { data: commentsData, error: commentsError } = await supabase.from("report_comments").select("*").eq("report_id", reportId).order("created_at", { ascending: true });
      if (commentsError) {
        if (commentsError.code === "42P01") {
          console.warn("report_comments table does not exist yet");
          setComments([]);
          return;
        }
        throw commentsError;
      }
      if (!commentsData || commentsData.length === 0) {
        setComments([]);
        return;
      }
      const userIds = [...new Set(commentsData.map((comment) => comment.user_id))];
      const { data: profilesData } = await supabase.from("profiles").select("id, full_name, email, avatar_url").in("id", userIds);
      const { data: userRolesData } = await supabase.from("user_roles").select("user_id, role").in("user_id", userIds);
      const commentsWithUsers = commentsData.map((comment) => {
        const userProfile = profilesData?.find((profile) => profile.id === comment.user_id) || {
          full_name: "Usuario desconocido",
          email: "unknown@example.com",
          avatar_url: null
        };
        const userRole = userRolesData?.find((role) => role.user_id === comment.user_id);
        const isUserAdmin = userRole?.role === "admin" || userRole?.role === "master_admin";
        const shouldHideName = isUserAdmin || userProfile.full_name === "ALEKSEY LVOV" || userProfile.email === "bb@bbbbb.cc";
        return {
          ...comment,
          user: shouldHideName ? {
            full_name: "",
            email: userProfile.email,
            avatar_url: userProfile.avatar_url
          } : userProfile
        };
      });
      setComments(commentsWithUsers);
    } catch (error) {
      console.error("Error fetching comments:", error);
      toast({
        title: t("errorTitle"),
        description: t("connectionError"),
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  const handleSendComment = async () => {
    if (!user || !newComment.trim()) return;
    setIsSending(true);
    try {
      const { error } = await supabase.from("report_comments").insert({
        report_id: reportId,
        user_id: user.id,
        content: newComment.trim(),
        is_anonymous: isAnonymous
      });
      if (error) {
        if (error.code === "42P01") {
          toast({
            title: t("errorTitle"),
            description: "Comments feature is not available yet. Please contact support.",
            variant: "destructive"
          });
          return;
        }
        throw error;
      }
      setNewComment("");
      setInputNewComment("");
      await fetchComments();
      toast({
        title: t("commentAdded"),
        description: t("commentAddedDesc")
      });
    } catch (error) {
      console.error("Error sending comment:", error);
      toast({
        title: t("errorTitle"),
        description: t("connectionError"),
        variant: "destructive"
      });
    } finally {
      setIsSending(false);
    }
  };
  const handleDeleteComment = async (commentId, commentUserId) => {
    if (!user) return;
    const canDelete = user.id === commentUserId || isAdmin || isMasterAdmin;
    if (!canDelete) {
      toast({
        title: t("errorTitle"),
        description: t("noPermissionDelete"),
        variant: "destructive"
      });
      return;
    }
    if (!window.confirm(t("deleteCommentConfirm"))) return;
    try {
      const { error } = await supabase.from("report_comments").delete().eq("id", commentId);
      if (error) throw error;
      await fetchComments();
      toast({
        title: t("commentDeleted"),
        description: t("commentDeletedDesc")
      });
    } catch (error) {
      console.error("Error deleting comment:", error);
      toast({
        title: t("errorTitle"),
        description: t("connectionError"),
        variant: "destructive"
      });
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendComment();
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Sheet, { open: isOpen, onOpenChange: setIsOpen, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SheetTrigger, { asChild: true, children }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      SheetContent,
      {
        side: "bottom",
        className: "h-[85vh] max-h-[90vh] w-full max-w-full bg-gray-900/95 backdrop-blur-xl border-t border-gray-700/50 p-4 sm:p-6 overflow-hidden",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SheetHeader, { className: "pb-3 sm:pb-4 flex-shrink-0 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetTitle, { className: "text-white flex items-center space-x-2 text-lg sm:text-xl", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-4 h-4 sm:w-5 sm:h-5 text-blue-400" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              t("comments"),
              " (",
              commentsCount,
              ")"
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-full max-h-[calc(85vh-120px)] min-h-0 overflow-hidden", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, { className: "flex-1 pr-2 sm:pr-4 mb-4 overflow-hidden", ref: scrollAreaRef, children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center text-gray-400 py-8", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-8 h-8 mx-auto mb-2 animate-pulse" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: t("loading") })
            ] }) : comments.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center text-gray-400 py-8", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-12 h-12 mx-auto mb-4 opacity-50" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: t("noCommentsYet") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: t("beFirstToComment") })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 sm:space-y-4 pb-4 px-1 overflow-hidden", children: comments.map((comment, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start space-x-2 sm:space-x-3 overflow-hidden", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  CommentAvatar,
                  {
                    avatarUrl: comment.user?.avatar_url,
                    userName: comment.user?.full_name,
                    isAnonymous: comment.is_anonymous
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 overflow-hidden", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1 min-w-0 overflow-hidden", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2 flex-1 min-w-0 overflow-hidden", children: [
                      comment.is_anonymous ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs sm:text-sm font-medium text-blue-400 truncate", children: t("anonymously") }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "text-xs px-1 py-0 h-4 hidden sm:flex flex-shrink-0", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-2 h-2 mr-1" }),
                          t("anonymously")
                        ] })
                      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          UserRoleBadgeWrapper,
                          {
                            userId: comment.user_id,
                            showIcon: true,
                            size: "sm",
                            className: "text-xs"
                          }
                        ) }),
                        comment.user?.full_name && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs sm:text-sm font-medium text-blue-400 truncate min-w-0", children: comment.user.full_name })
                      ] }),
                      comment.user_id === user?.id && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "border-green-500 text-green-400 text-xs px-1 py-0 h-4 flex-shrink-0", children: t("you") })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2 flex-shrink-0 overflow-hidden", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-gray-500 whitespace-nowrap", children: formatTimeAMPM(new Date(comment.created_at)) }),
                      (comment.user_id === user?.id || isAdmin || isMasterAdmin) && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Button,
                        {
                          variant: "ghost",
                          size: "icon",
                          onClick: () => handleDeleteComment(comment.id, comment.user_id),
                          className: "w-6 h-6 text-red-400 hover:text-red-300 hover:bg-red-500/20 flex-shrink-0",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3 h-3" })
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gray-800/50 rounded-2xl px-2 sm:px-3 py-2 backdrop-blur-sm border border-gray-700/30 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs sm:text-sm text-gray-100 leading-relaxed break-words overflow-hidden", children: comment.content }) })
                ] })
              ] }),
              index < comments.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "mt-4 bg-gray-700/50" })
            ] }, comment.id)) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-3 sm:pt-4 border-t border-gray-700/50 bg-gray-900/70 rounded-t-lg flex-shrink-0 overflow-hidden", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2 mb-3 px-3 sm:px-4 overflow-hidden", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Switch,
                  {
                    id: "anonymous-comment",
                    checked: isAnonymous,
                    onCheckedChange: setIsAnonymous,
                    className: "data-[state=checked]:bg-blue-600 scale-90 sm:scale-100 flex-shrink-0"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "anonymous-comment", className: "text-gray-300 text-xs sm:text-sm truncate", children: t("commentAnonymously") })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex space-x-2 sm:space-x-3 px-3 sm:px-4 pb-3 sm:pb-4 overflow-hidden", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  MUIInput,
                  {
                    placeholder: t("writeCommentPlaceholder"),
                    value: inputNewComment,
                    onChange: (e) => setInputNewComment(e.target.value),
                    onKeyPress: handleKeyPress,
                    className: "flex-grow bg-background text-foreground",
                    disabled: isSending
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    size: "icon",
                    onClick: handleSendComment,
                    disabled: isSending || !newComment.trim(),
                    className: "bg-primary hover:bg-primary/90 text-primary-foreground",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-3 h-3 sm:w-4 sm:h-4" })
                  }
                )
              ] })
            ] })
          ] })
        ]
      }
    )
  ] });
};
const ImageUploader = ({
  images,
  onImagesChange,
  maxImages = 3,
  disabled = false,
  getText
}) => {
  const { toast: toast2 } = useToast();
  const fileInputRef = reactExports.useRef(null);
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const generateId = () => Math.random().toString(36).substr(2, 9);
  const addImage = (file, preview, source) => {
    if (images.length >= maxImages) {
      toast2({
        title: getText("Error", "Error"),
        description: getText(`Maximum ${maxImages} images allowed`, `Máximo ${maxImages} imágenes permitidas`),
        variant: "destructive"
      });
      return;
    }
    const newImage = {
      id: generateId(),
      file,
      preview,
      source
    };
    onImagesChange([...images, newImage]);
  };
  const removeImage = (id) => {
    const updatedImages = images.filter((img) => img.id !== id);
    onImagesChange(updatedImages);
  };
  const handleFileSelect = (event) => {
    const files = event.target.files;
    if (!files) return;
    Array.from(files).forEach((file) => {
      if (images.length >= maxImages) return;
      if (!file.type.startsWith("image/")) {
        toast2({
          title: getText("Error", "Error"),
          description: getText("Please select image files only", "Por favor selecciona solo archivos de imagen"),
          variant: "destructive"
        });
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        toast2({
          title: getText("Error", "Error"),
          description: getText("Image size must be less than 10MB", "El tamaño de la imagen debe ser menor a 10MB"),
          variant: "destructive"
        });
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          addImage(file, e.target.result, "file");
        }
      };
      reader.readAsDataURL(file);
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  const handleImageCapture = async () => {
    if (!Capacitor.isNativePlatform()) {
      fileInputRef.current?.click();
      return;
    }
    try {
      setIsLoading(true);
      const image = await Camera$1.getPhoto({
        quality: 80,
        allowEditing: true,
        resultType: CameraResultType.DataUrl,
        // Используем Prompt для выбора между камерой и галереей, fallback на Photos
        source: CameraSource.Prompt || CameraSource.Photos
      });
      if (image.dataUrl) {
        addImage(null, image.dataUrl, "camera");
      }
    } catch (error) {
      console.error("Error capturing image:", error);
      toast2({
        title: getText("Error", "Error"),
        description: getText("Failed to capture image", "Error al capturar imagen"),
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  const canAddMore = images.length < maxImages;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    images.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2", children: images.map((image) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative group", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-square rounded-lg overflow-hidden border border-gray-200", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: image.preview,
          alt: "Preview",
          className: "w-full h-full object-cover"
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          variant: "destructive",
          size: "sm",
          className: "absolute -top-2 -right-2 h-6 w-6 p-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity",
          onClick: () => removeImage(image.id),
          disabled,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3 w-3" })
        }
      )
    ] }, image.id)) }),
    canAddMore && !disabled && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          variant: "outline",
          onClick: handleImageCapture,
          disabled: isLoading,
          className: `
              w-full h-12 flex items-center justify-center gap-3 
              border-2 border-dashed border-[#83c2e5] hover:border-[#83c2e5]/80 
              transition-all duration-200 bg-[#83c2e5] hover:bg-[#83c2e5]/90 text-white
              ${isLoading ? "cursor-not-allowed opacity-70" : "cursor-pointer"}
            `,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: `h-5 w-5 transition-colors ${isLoading ? "text-blue-300" : "text-white"}` }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `font-medium transition-colors ${isLoading ? "text-blue-300" : "text-white"}`, children: isLoading ? getText("Loading...", "Cargando...") : getText("Add Photo to Post", "Agregar Foto al Reporte") }),
            isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ml-2 w-4 h-4 border-2 border-blue-300 border-t-white rounded-full animate-spin" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          ref: fileInputRef,
          type: "file",
          accept: "image/*",
          multiple: true,
          onChange: handleFileSelect,
          className: "hidden",
          disabled
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-gray-500", children: getText(
      `${images.length}/${maxImages} images • Max 10MB each`,
      `${images.length}/${maxImages} imágenes • Máx 10MB cada una`
    ) })
  ] });
};
const ImageGallery = ({ images, className = "" }) => {
  const [lightboxOpen, setLightboxOpen] = reactExports.useState(false);
  const [currentImageIndex, setCurrentImageIndex] = reactExports.useState(0);
  const [imageAspectRatios, setImageAspectRatios] = reactExports.useState({});
  if (!images || images.length === 0) return null;
  const sortedImages = [...images].sort((a, b) => a.image_order - b.image_order);
  const loadImageAspectRatio = (imageUrl, imageId) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const aspectRatio = img.width / img.height;
        setImageAspectRatios((prev) => ({
          ...prev,
          [imageId]: aspectRatio
        }));
        resolve();
      };
      img.onerror = () => {
        setImageAspectRatios((prev) => ({
          ...prev,
          [imageId]: 1
          // квадратное по умолчанию
        }));
        resolve();
      };
      img.src = imageUrl;
    });
  };
  reactExports.useEffect(() => {
    const loadAllAspectRatios = async () => {
      const promises = sortedImages.map(
        (image) => loadImageAspectRatio(image.image_url, image.id)
      );
      await Promise.all(promises);
    };
    if (sortedImages.length > 0) {
      loadAllAspectRatios();
    }
  }, [sortedImages]);
  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };
  const closeLightbox = () => {
    setLightboxOpen(false);
  };
  const goToPrevious = () => {
    setCurrentImageIndex((prev) => prev > 0 ? prev - 1 : sortedImages.length - 1);
  };
  const goToNext = () => {
    setCurrentImageIndex((prev) => prev < sortedImages.length - 1 ? prev + 1 : 0);
  };
  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") goToPrevious();
    if (e.key === "ArrowRight") goToNext();
    if (e.key === "Escape") closeLightbox();
  };
  const getGridLayout = () => {
    switch (sortedImages.length) {
      case 1:
        return "grid-cols-1";
      case 2:
        return "grid-cols-2";
      case 3:
        return "grid-cols-2 md:grid-cols-3";
      default:
        return "grid-cols-2";
    }
  };
  const getImageStyle = (index) => {
    if (sortedImages.length === 3 && index === 0) {
      return "md:row-span-2";
    }
    return "";
  };
  const getImageContainerClass = (index, imageId) => {
    const baseClasses = "relative cursor-pointer group overflow-hidden rounded-lg bg-gray-100";
    const styleClasses = getImageStyle(index);
    const aspectRatio = imageAspectRatios[imageId];
    if (!aspectRatio) {
      const fallbackClass = sortedImages.length === 1 ? "aspect-video" : "aspect-square";
      return `${baseClasses} ${styleClasses} ${fallbackClass}`;
    }
    let maxHeight = "";
    if (sortedImages.length === 1) {
      maxHeight = "max-h-48";
    } else if (sortedImages.length === 2) {
      maxHeight = "max-h-40";
    } else {
      maxHeight = index === 0 ? "max-h-40" : "max-h-20";
    }
    return `${baseClasses} ${styleClasses} ${maxHeight}`;
  };
  const getImageContainerStyle = (imageId) => {
    const aspectRatio = imageAspectRatios[imageId];
    if (!aspectRatio) return {};
    return {
      aspectRatio: aspectRatio.toString()
    };
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `${className} mt-3`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `grid gap-1 ${getGridLayout()}`, children: sortedImages.map((image, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: getImageContainerClass(index, image.id),
        style: getImageContainerStyle(image.id),
        onClick: (e) => {
          e.stopPropagation();
          openLightbox(index);
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: image.image_url,
              alt: image.alt_text || `Image ${index + 1}`,
              className: "w-full h-full object-contain transition-transform duration-200 group-hover:scale-105 max-w-full max-h-full",
              style: { objectPosition: "center" },
              loading: "lazy"
            }
          ),
          !imageAspectRatios[image.id] && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-gray-100", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-6 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ZoomIn, { className: "text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 w-6 h-6" }) })
        ]
      },
      image.id
    )) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: lightboxOpen, onOpenChange: closeLightbox, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      DialogContent,
      {
        className: "max-w-[95vw] max-h-[95vh] p-0 bg-black/95 border-none",
        onKeyDown: handleKeyDown,
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full h-[95vh] flex items-center justify-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "sm",
              className: "absolute top-4 right-4 z-50 text-white hover:bg-white/20 h-10 w-10 p-0",
              onClick: closeLightbox,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-5 w-5" })
            }
          ),
          sortedImages.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "sm",
              className: "absolute left-4 top-1/2 -translate-y-1/2 z-50 text-white hover:bg-white/20 h-12 w-12 p-0",
              onClick: goToPrevious,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-6 w-6" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, scale: 0.9 },
              animate: { opacity: 1, scale: 1 },
              exit: { opacity: 0, scale: 0.9 },
              transition: { duration: 0.2 },
              className: "relative max-w-full max-h-full flex items-center justify-center",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: sortedImages[currentImageIndex]?.image_url,
                  alt: sortedImages[currentImageIndex]?.alt_text || `Image ${currentImageIndex + 1}`,
                  className: "max-w-full max-h-full object-contain",
                  style: {
                    objectPosition: "center",
                    maxWidth: "90vw",
                    maxHeight: "80vh"
                  }
                }
              )
            },
            currentImageIndex
          ) }),
          sortedImages.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "sm",
              className: "absolute right-4 top-1/2 -translate-y-1/2 z-50 text-white hover:bg-white/20 h-12 w-12 p-0",
              onClick: goToNext,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-6 w-6" })
            }
          ),
          sortedImages.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-4 left-1/2 -translate-x-1/2 z-50", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 bg-black/50 rounded-full px-3 py-2", children: sortedImages.map((_, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              className: `w-2 h-2 rounded-full transition-all ${index === currentImageIndex ? "bg-white" : "bg-white/50"}`,
              onClick: () => setCurrentImageIndex(index)
            },
            index
          )) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-4 right-4 text-white text-sm bg-black/50 rounded px-2 py-1", children: [
            currentImageIndex + 1,
            " / ",
            sortedImages.length
          ] })
        ] })
      }
    ) })
  ] });
};
const ViewsIcon = ({ className }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    width: "30",
    height: "40",
    viewBox: "0 0 24 24",
    className,
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { clipPath: "url(#clip0_4418_8842)", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: "M22 22.75H5C2.93 22.75 1.25 21.07 1.25 19V2C1.25 1.59 1.59 1.25 2 1.25C2.41 1.25 2.75 1.59 2.75 2V19C2.75 20.24 3.76 21.25 5 21.25H22C22.41 21.25 22.75 21.59 22.75 22C22.75 22.41 22.41 22.75 22 22.75Z",
            fill: "currentColor"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: "M5.00007 17.7498C4.83007 17.7498 4.65007 17.6898 4.51007 17.5698C4.20007 17.2998 4.16007 16.8298 4.43007 16.5098L9.02007 11.1498C9.52007 10.5698 10.2401 10.2198 11.0001 10.1898C11.7601 10.1698 12.5101 10.4498 13.0501 10.9898L14.0001 11.9398C14.2501 12.1898 14.5701 12.3098 14.9301 12.3098C15.2801 12.2998 15.6001 12.1398 15.8301 11.8698L20.4201 6.50982C20.6901 6.19982 21.1601 6.15982 21.4801 6.42982C21.7901 6.69982 21.8301 7.16982 21.5601 7.48982L16.9701 12.8498C16.4701 13.4298 15.7501 13.7798 14.9901 13.8098C14.2201 13.8298 13.4801 13.5498 12.9401 13.0098L12.0001 12.0598C11.7501 11.8098 11.4201 11.6798 11.0701 11.6898C10.7201 11.6998 10.4001 11.8598 10.1701 12.1298L5.58007 17.4898C5.42007 17.6598 5.21007 17.7498 5.00007 17.7498Z",
            fill: "currentColor"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("clipPath", { id: "clip0_4418_8842", children: /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { width: "24", height: "24", fill: "white" }) }) })
    ]
  }
);
const DeleteIcon = ({ className }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    className,
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { clipPath: "url(#clip0_4418_3673)", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: "M2 13.05V15C2 20 4 22 9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9",
            stroke: "currentColor",
            strokeWidth: "1.5",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: "M17.9001 9.04875C15.7201 8.82875 13.5201 8.71875 11.3301 8.71875C10.0301 8.71875 8.73009 8.78875 7.44009 8.91875L6.1001 9.04875",
            stroke: "currentColor",
            strokeWidth: "1.5",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: "M9.70996 8.38945L9.84996 7.52945C9.94996 6.90945 10.03 6.43945 11.14 6.43945H12.86C13.97 6.43945 14.0499 6.92945 14.1499 7.52945L14.2899 8.37946",
            stroke: "currentColor",
            strokeWidth: "1.5",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: "M16.49 9.12891L16.06 15.7289C15.99 16.7589 15.93 17.5589 14.1 17.5589H9.89C8.06 17.5589 7.99999 16.7589 7.92999 15.7289L7.5 9.12891",
            stroke: "currentColor",
            strokeWidth: "1.5",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("clipPath", { id: "clip0_4418_3673", children: /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { width: "24", height: "24", fill: "white" }) }) })
    ]
  }
);
const SocialFeed = ({ className }) => {
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const { isAdmin } = useUserRole$1();
  const [selectedCategory, setSelectedCategory] = reactExports.useState("all");
  const [showCreatePost, setShowCreatePost] = reactExports.useState(false);
  const [isCreating, setIsCreating] = reactExports.useState(false);
  const [posts, setPosts] = reactExports.useState([]);
  const [isLoading, setIsLoading] = reactExports.useState(true);
  const [selectedPost, setSelectedPost] = reactExports.useState(null);
  const [showPostDetail, setShowPostDetail] = reactExports.useState(false);
  const [comments, setComments] = reactExports.useState([]);
  const [isLoadingComments, setIsLoadingComments] = reactExports.useState(false);
  const [newComment, setNewComment] = reactExports.useState("");
  const [isPostingComment, setIsPostingComment] = reactExports.useState(false);
  const [currentUserProfile, setCurrentUserProfile] = reactExports.useState(null);
  const [showAllComments, setShowAllComments] = reactExports.useState(false);
  const [userPostLikes, setUserPostLikes] = reactExports.useState(/* @__PURE__ */ new Set());
  const [userCommentLikes, setUserCommentLikes] = reactExports.useState(/* @__PURE__ */ new Set());
  const [selectedUserId, setSelectedUserId] = reactExports.useState(null);
  const [isProfileCardOpen, setIsProfileCardOpen] = reactExports.useState(false);
  const [likingInProgress, setLikingInProgress] = reactExports.useState(/* @__PURE__ */ new Set());
  const [deletingInProgress, setDeletingInProgress] = reactExports.useState(/* @__PURE__ */ new Set());
  const [replyingToComment, setReplyingToComment] = reactExports.useState(null);
  const [replyContent, setReplyContent] = reactExports.useState("");
  const [isPostingReply, setIsPostingReply] = reactExports.useState(false);
  const [showRepliesFor, setShowRepliesFor] = reactExports.useState(/* @__PURE__ */ new Set());
  const [postTitle, setPostTitle] = reactExports.useState("");
  const [postContent, setPostContent] = reactExports.useState("");
  const [postCategory, setPostCategory] = reactExports.useState("discussion");
  const [isAnonymous] = reactExports.useState(false);
  const [postImages, setPostImages] = reactExports.useState([]);
  const getText = (enText, esText) => {
    return language === "es" ? esText : enText;
  };
  const loadPosts = async () => {
    try {
      setIsLoading(true);
      const { data: postsData, error } = await supabase.from("social_feed_posts").select("*").order("created_at", { ascending: false }).limit(50);
      if (error) throw error;
      const userIds = [...new Set(postsData?.map((post) => post.user_id) || [])];
      const { data: profilesData } = await supabase.from("profiles").select("id, full_name, username, avatar_url").in("id", userIds);
      const postIds = postsData?.map((post) => post.id) || [];
      const { data: imagesData } = await supabase.from("social_feed_post_images").select("*").in("post_id", postIds).order("image_order", { ascending: true });
      const postsWithProfilesAndImages = postsData?.map((post) => ({
        ...post,
        profiles: profilesData?.find((profile) => profile.id === post.user_id) || null,
        images: imagesData?.filter((image) => image.post_id === post.id) || []
      })) || [];
      console.log("Posts loaded with profiles and images:", postsWithProfilesAndImages);
      setPosts(postsWithProfilesAndImages);
    } catch (error) {
      console.error("Error loading posts:", error);
      toast({
        title: getText("Error", "Error"),
        description: getText("Failed to load posts", "Error al cargar las publicaciones"),
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  reactExports.useEffect(() => {
    loadPosts();
    loadCurrentUserProfile();
    if (user) {
      loadUserLikes();
    }
  }, [user]);
  const loadCurrentUserProfile = async () => {
    if (!user) return;
    try {
      const { data, error } = await supabase.from("profiles").select("id, username, avatar_url").eq("id", user.id).single();
      if (error) throw error;
      setCurrentUserProfile(data);
    } catch (error) {
      console.error("Error loading current user profile:", error);
    }
  };
  const loadUserLikes = async () => {
    if (!user) return;
    try {
      const { data: postLikes, error: postLikesError } = await supabase.from("social_feed_likes").select("post_id").eq("user_id", user.id);
      if (postLikesError) throw postLikesError;
      const { data: commentLikes, error: commentLikesError } = await supabase.from("social_feed_comment_likes").select("comment_id").eq("user_id", user.id);
      if (commentLikesError) throw commentLikesError;
      setUserPostLikes(new Set(postLikes?.map((like) => like.post_id) || []));
      setUserCommentLikes(new Set(commentLikes?.map((like) => like.comment_id) || []));
    } catch (error) {
      console.error("Error loading user likes:", error);
    }
  };
  const togglePostLike = async (postId) => {
    if (!user || likingInProgress.has(postId)) return;
    const isCurrentlyLiked = userPostLikes.has(postId);
    setLikingInProgress((prev) => /* @__PURE__ */ new Set([...prev, postId]));
    if (isCurrentlyLiked) {
      setUserPostLikes((prev) => {
        const newSet = new Set(prev);
        newSet.delete(postId);
        return newSet;
      });
      setPosts((prev) => prev.map(
        (post) => post.id === postId ? { ...post, like_count: Math.max(0, post.like_count - 1) } : post
      ));
    } else {
      setUserPostLikes((prev) => /* @__PURE__ */ new Set([...prev, postId]));
      setPosts((prev) => prev.map(
        (post) => post.id === postId ? { ...post, like_count: post.like_count + 1 } : post
      ));
    }
    try {
      if (isCurrentlyLiked) {
        const { error } = await supabase.from("social_feed_likes").delete().eq("user_id", user.id).eq("post_id", postId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("social_feed_likes").insert({
          user_id: user.id,
          post_id: postId
        });
        if (error) throw error;
      }
    } catch (error) {
      console.error("Error toggling post like:", error);
      if (isCurrentlyLiked) {
        setUserPostLikes((prev) => /* @__PURE__ */ new Set([...prev, postId]));
        setPosts((prev) => prev.map(
          (post) => post.id === postId ? { ...post, like_count: post.like_count + 1 } : post
        ));
      } else {
        setUserPostLikes((prev) => {
          const newSet = new Set(prev);
          newSet.delete(postId);
          return newSet;
        });
        setPosts((prev) => prev.map(
          (post) => post.id === postId ? { ...post, like_count: Math.max(0, post.like_count - 1) } : post
        ));
      }
      toast({
        title: getText("Error", "Error"),
        description: getText("Failed to update like", "Error al actualizar el me gusta"),
        variant: "destructive"
      });
    } finally {
      setLikingInProgress((prev) => {
        const newSet = new Set(prev);
        newSet.delete(postId);
        return newSet;
      });
    }
  };
  const toggleCommentLike = async (commentId) => {
    if (!user || likingInProgress.has(commentId)) return;
    const isCurrentlyLiked = userCommentLikes.has(commentId);
    setLikingInProgress((prev) => /* @__PURE__ */ new Set([...prev, commentId]));
    if (isCurrentlyLiked) {
      setUserCommentLikes((prev) => {
        const newSet = new Set(prev);
        newSet.delete(commentId);
        return newSet;
      });
      setComments((prev) => prev.map(
        (comment) => comment.id === commentId ? { ...comment, like_count: Math.max(0, comment.like_count - 1) } : comment
      ));
    } else {
      setUserCommentLikes((prev) => /* @__PURE__ */ new Set([...prev, commentId]));
      setComments((prev) => prev.map(
        (comment) => comment.id === commentId ? { ...comment, like_count: comment.like_count + 1 } : comment
      ));
    }
    try {
      if (isCurrentlyLiked) {
        const { error } = await supabase.from("social_feed_comment_likes").delete().eq("user_id", user.id).eq("comment_id", commentId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("social_feed_comment_likes").insert({
          user_id: user.id,
          comment_id: commentId
        });
        if (error) throw error;
      }
    } catch (error) {
      console.error("Error toggling comment like:", error);
      if (isCurrentlyLiked) {
        setUserCommentLikes((prev) => /* @__PURE__ */ new Set([...prev, commentId]));
        setComments((prev) => prev.map(
          (comment) => comment.id === commentId ? { ...comment, like_count: comment.like_count + 1 } : comment
        ));
      } else {
        setUserCommentLikes((prev) => {
          const newSet = new Set(prev);
          newSet.delete(commentId);
          return newSet;
        });
        setComments((prev) => prev.map(
          (comment) => comment.id === commentId ? { ...comment, like_count: Math.max(0, comment.like_count - 1) } : comment
        ));
      }
      toast({
        title: getText("Error", "Error"),
        description: getText("Failed to update like", "Error al actualizar el me gusta"),
        variant: "destructive"
      });
    } finally {
      setLikingInProgress((prev) => {
        const newSet = new Set(prev);
        newSet.delete(commentId);
        return newSet;
      });
    }
  };
  const deletePost = async (postId) => {
    if (!user || !isAdmin() || deletingInProgress.has(postId)) return;
    const confirmDelete = window.confirm(
      getText(
        "Are you sure you want to delete this post? This action cannot be undone.",
        "¿Estás seguro de que quieres eliminar esta publicación? Esta acción no se puede deshacer."
      )
    );
    if (!confirmDelete) return;
    setDeletingInProgress((prev) => /* @__PURE__ */ new Set([...prev, postId]));
    try {
      await Promise.all([
        // Удаляем лайки
        supabase.from("social_feed_likes").delete().eq("post_id", postId),
        // Удаляем лайки комментариев
        supabase.from("social_feed_comment_likes").delete().in(
          "comment_id",
          comments.filter((c) => c.post_id === postId).map((c) => c.id)
        ),
        // Удаляем комментарии
        supabase.from("social_feed_comments").delete().eq("post_id", postId),
        // Удаляем изображения
        supabase.from("social_feed_post_images").delete().eq("post_id", postId),
        // Удаляем просмотры
        supabase.from("social_feed_views").delete().eq("post_id", postId)
      ]);
      const { error } = await supabase.from("social_feed_posts").delete().eq("id", postId);
      if (error) throw error;
      setPosts((prev) => prev.filter((post) => post.id !== postId));
      if (selectedPost?.id === postId) {
        setShowPostDetail(false);
        setSelectedPost(null);
      }
      toast({
        title: getText("Success", "Éxito"),
        description: getText("Post deleted successfully", "Publicación eliminada exitosamente")
      });
    } catch (error) {
      console.error("Error deleting post:", error);
      toast({
        title: getText("Error", "Error"),
        description: getText("Failed to delete post", "Error al eliminar la publicación"),
        variant: "destructive"
      });
    } finally {
      setDeletingInProgress((prev) => {
        const newSet = new Set(prev);
        newSet.delete(postId);
        return newSet;
      });
    }
  };
  const handleReplyToComment = async (parentCommentId) => {
    if (!user || !selectedPost || !replyContent.trim()) {
      toast({
        title: getText("Error", "Error"),
        description: getText("Please enter your reply", "Por favor ingresa tu respuesta"),
        variant: "destructive"
      });
      return;
    }
    setIsPostingReply(true);
    try {
      const { data, error } = await supabase.from("social_feed_comments").insert({
        post_id: selectedPost.id,
        user_id: user.id,
        content: replyContent.trim(),
        parent_comment_id: parentCommentId,
        // Ответ на комментарий
        is_anonymous: false
      }).select("*").single();
      if (error) throw error;
      toast({
        title: getText("Success", "Éxito"),
        description: getText("Reply posted successfully!", "¡Respuesta publicada exitosamente!")
      });
      setReplyContent("");
      setReplyingToComment(null);
      await loadComments(selectedPost.id);
    } catch (error) {
      console.error("Error posting reply:", error);
      toast({
        title: getText("Error", "Error"),
        description: getText("Failed to post reply", "Error al publicar la respuesta"),
        variant: "destructive"
      });
    } finally {
      setIsPostingReply(false);
    }
  };
  const startReplyToComment = (commentId) => {
    setReplyingToComment(commentId);
    setReplyContent("");
  };
  const cancelReply = () => {
    setReplyingToComment(null);
    setReplyContent("");
  };
  const toggleRepliesVisibility = (commentId) => {
    setShowRepliesFor((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(commentId)) {
        newSet.delete(commentId);
      } else {
        newSet.add(commentId);
      }
      return newSet;
    });
  };
  const getRepliesForComment = (commentId) => {
    return comments.filter((comment) => comment.parent_comment_id === commentId);
  };
  const getReplyCount = (commentId) => {
    return comments.filter((comment) => comment.parent_comment_id === commentId).length;
  };
  const getMainComments = () => {
    return comments.filter((comment) => !comment.parent_comment_id);
  };
  const uploadPostImages = async (postId, images) => {
    const uploadedImages = [];
    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      if (!image.file && !image.preview.startsWith("data:")) continue;
      try {
        let imageData;
        let fileName;
        if (image.file) {
          imageData = image.file;
          fileName = `${postId}_${i + 1}_${Date.now()}.${image.file.type.split("/")[1]}`;
        } else {
          const response = await fetch(image.preview);
          const blob = await response.blob();
          imageData = blob;
          fileName = `${postId}_${i + 1}_${Date.now()}.jpg`;
        }
        const { data: uploadData, error: uploadError } = await supabase.storage.from("social-feed-images").upload(fileName, imageData, {
          cacheControl: "3600",
          upsert: false
        });
        if (uploadError) {
          console.error("Upload error:", uploadError);
          continue;
        }
        const { data: urlData } = supabase.storage.from("social-feed-images").getPublicUrl(fileName);
        const { data: imageRecord, error: dbError } = await supabase.from("social_feed_post_images").insert({
          post_id: postId,
          image_url: urlData.publicUrl,
          image_order: i + 1,
          alt_text: `Image ${i + 1}`
        }).select().single();
        if (dbError) {
          console.error("DB error:", dbError);
          continue;
        }
        uploadedImages.push(imageRecord);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
    return uploadedImages;
  };
  const handleCreatePost = async () => {
    if (!user) {
      toast({
        title: getText("Error", "Error"),
        description: getText("You must be logged in to create a post", "Debes estar conectado para crear una publicación"),
        variant: "destructive"
      });
      return;
    }
    if (!postContent.trim()) {
      toast({
        title: getText("Error", "Error"),
        description: getText("Please enter content for your post", "Por favor ingresa contenido para tu publicación"),
        variant: "destructive"
      });
      return;
    }
    setIsCreating(true);
    try {
      const { data, error } = await supabase.from("social_feed_posts").insert({
        user_id: user.id,
        title: postTitle.trim() || null,
        content: postContent.trim(),
        category: postCategory,
        is_anonymous: isAnonymous,
        location: null
      }).select("*").single();
      if (error) throw error;
      let uploadedImages = [];
      if (postImages.length > 0) {
        uploadedImages = await uploadPostImages(data.id, postImages);
      }
      toast({
        title: getText("Success", "Éxito"),
        description: getText("Your post has been created!", "¡Tu publicación ha sido creada!")
      });
      const { data: profileData } = await supabase.from("profiles").select("id, full_name, username, avatar_url").eq("id", user.id).single();
      if (data) {
        const newPostWithProfile = {
          ...data,
          image_count: uploadedImages.length,
          images: uploadedImages,
          profiles: profileData || null
        };
        setPosts((prevPosts) => [newPostWithProfile, ...prevPosts]);
        if (user) {
          await loadUserLikes();
        }
      }
      setPostTitle("");
      setPostContent("");
      setPostCategory("discussion");
      setPostImages([]);
      setShowCreatePost(false);
    } catch (error) {
      console.error("Error creating post:", error);
      toast({
        title: getText("Error", "Error"),
        description: getText("Failed to create post", "Error al crear la publicación"),
        variant: "destructive"
      });
    } finally {
      setIsCreating(false);
    }
  };
  const categories = [
    { id: "all", label: getText("All", "Todos"), color: "bg-gray-500" },
    { id: "safety_alert", label: getText("Safety", "Seguridad"), color: "bg-red-500" },
    { id: "observation", label: getText("Observation", "Observación"), color: "bg-blue-500" },
    { id: "question", label: getText("Question", "Pregunta"), color: "bg-yellow-500" },
    { id: "discussion", label: getText("Discussion", "Discusión"), color: "bg-green-500" }
  ];
  const getCategoryColor = (category) => {
    const categoryInfo = categories.find((c) => c.id === category);
    return categoryInfo?.color || "bg-gray-500";
  };
  const getCategoryLabel = (category) => {
    const categoryInfo = categories.find((c) => c.id === category);
    return categoryInfo?.label || category;
  };
  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = /* @__PURE__ */ new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1e3);
    if (diffInSeconds < 60) {
      return getText("Just now", "Ahora mismo");
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return language === "es" ? `hace ${minutes}m` : `${minutes}m ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return language === "es" ? `hace ${hours}h` : `${hours}h ago`;
    } else {
      const days = Math.floor(diffInSeconds / 86400);
      return language === "es" ? `hace ${days}d` : `${days}d ago`;
    }
  };
  const getDisplayName = (post) => {
    if (post.is_anonymous) {
      return getText("Anonymous", "Anónimo");
    }
    const username = post.profiles?.username;
    return username ? `@${username}` : getText("Unknown User", "Usuario Desconocido");
  };
  const getUserAvatar = (post) => {
    if (post.is_anonymous) {
      return null;
    }
    return post.profiles?.avatar_url;
  };
  const getUserInitials = (post) => {
    if (post.is_anonymous) {
      return "?";
    }
    const username = post.profiles?.username;
    if (username) {
      return username.charAt(0).toUpperCase();
    }
    return "U";
  };
  const handleViewProfile = (userId) => {
    setSelectedUserId(userId);
    setIsProfileCardOpen(true);
  };
  const openPostDetail = async (post) => {
    setSelectedPost(post);
    setShowPostDetail(true);
    setShowAllComments(false);
    if (user) {
      await incrementPostView(post.id);
    }
    await loadComments(post.id);
    if (user) {
      await loadUserLikes();
    }
  };
  const incrementPostView = async (postId) => {
    if (!user) {
      console.log("No user for view increment");
      return;
    }
    console.log("Attempting to increment view for post:", postId, "user:", user.id);
    try {
      const { data: existingView, error: checkError } = await supabase.from("social_feed_views").select("id").eq("post_id", postId).eq("user_id", user.id).single();
      if (checkError && checkError.code !== "PGRST116") {
        console.error("Error checking existing view:", checkError);
        return;
      }
      if (existingView) {
        console.log("View already exists for this user and post");
        return;
      }
      console.log("No existing view found, inserting new view...");
      const { data, error } = await supabase.from("social_feed_views").insert({
        post_id: postId,
        user_id: user.id,
        viewed_at: (/* @__PURE__ */ new Date()).toISOString()
      }).select();
      if (error) {
        console.error("Error inserting view:", error);
        return;
      }
      console.log("View inserted successfully:", data);
      console.log("View recorded, trigger will update count automatically");
    } catch (error) {
      console.error("Unexpected error in incrementPostView:", error);
    }
  };
  const loadComments = async (postId) => {
    try {
      setIsLoadingComments(true);
      console.log("Loading comments for post:", postId);
      const { data, error } = await supabase.from("social_feed_comments").select(`
          *,
          profiles:user_id(id, username, avatar_url, full_name)
        `).eq("post_id", postId).order("created_at", { ascending: true });
      if (error) {
        console.error("Error loading comments:", error);
        const { data: commentsData, error: commentsError } = await supabase.from("social_feed_comments").select("*").eq("post_id", postId).order("created_at", { ascending: true });
        if (commentsError) {
          console.error("Error loading comments (simple):", commentsError);
          setComments([]);
        } else {
          const userIds = [...new Set(commentsData?.map((comment) => comment.user_id) || [])];
          const { data: profilesData } = await supabase.from("profiles").select("id, username, avatar_url, full_name").in("id", userIds);
          const commentsWithProfiles = commentsData?.map((comment) => ({
            ...comment,
            user_username: profilesData?.find((p) => p.id === comment.user_id)?.username || null,
            user_avatar_url: profilesData?.find((p) => p.id === comment.user_id)?.avatar_url || null,
            user_full_name: profilesData?.find((p) => p.id === comment.user_id)?.full_name || null
          })) || [];
          console.log("Comments loaded (fallback):", commentsWithProfiles);
          setComments(commentsWithProfiles);
        }
      } else {
        const formattedComments = data?.map((comment) => ({
          ...comment,
          user_username: comment.profiles?.username || null,
          user_avatar_url: comment.profiles?.avatar_url || null,
          user_full_name: comment.profiles?.full_name || null
        })) || [];
        console.log("Comments loaded (JOIN):", formattedComments);
        setComments(formattedComments);
      }
    } catch (error) {
      console.error("Error loading comments:", error);
      setComments([]);
    } finally {
      setIsLoadingComments(false);
    }
  };
  const handleAddComment = async () => {
    if (!user || !selectedPost || !newComment.trim()) return;
    try {
      setIsPostingComment(true);
      const { data, error } = await supabase.from("social_feed_comments").insert({
        post_id: selectedPost.id,
        user_id: user.id,
        content: newComment.trim(),
        is_anonymous: false
        // Пока комментарии не анонимные
      }).select("*").single();
      if (error) throw error;
      toast({
        title: getText("Success", "Éxito"),
        description: getText("Comment added!", "¡Comentario añадido!")
      });
      setNewComment("");
      setTimeout(() => {
        loadComments(selectedPost.id);
      }, 500);
      setPosts(
        (prevPosts) => prevPosts.map(
          (p) => p.id === selectedPost.id ? { ...p, comment_count: p.comment_count + 1 } : p
        )
      );
      if (selectedPost) {
        setSelectedPost((prev) => prev ? { ...prev, comment_count: prev.comment_count + 1 } : null);
      }
    } catch (error) {
      console.error("Error adding comment:", error);
      toast({
        title: getText("Error", "Error"),
        description: getText("Failed to add comment", "Error al añadir comentario"),
        variant: "destructive"
      });
    } finally {
      setIsPostingComment(false);
    }
  };
  const filteredPosts = selectedCategory === "all" ? posts : posts.filter((post) => post.category === selectedCategory);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `max-w-2xl mx-auto ${className}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Card,
      {
        className: "profile-card-neumorph mb-4 mt-4",
        style: {
          borderRadius: "14px",
          background: "#1e2327",
          boxShadow: "inset -5px 5px 9px #14171a, inset 5px -5px 9px #282f34",
          border: "1px solid #23272b"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: getText("Filter by category", "Filtrar por categoría") }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: categories.map((category) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: selectedCategory === category.id ? "default" : "outline",
              className: `cursor-pointer ${selectedCategory === category.id ? category.color : ""}`,
              onClick: () => setSelectedCategory(category.id),
              children: category.label
            },
            category.id
          )) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open: showCreatePost, onOpenChange: setShowCreatePost, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "w-full bg-[#83c2e5] hover:bg-[#83c2e5]/90 text-white", children: getText("Create new post", "Crear nueva publicación") }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-[500px] max-h-[90vh]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: getText("Create New Post", "Crear Nueva Publicación") }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 py-4 max-h-[70vh] overflow-y-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "category", children: getText("Category", "Categoría") }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select$1, { value: postCategory, onValueChange: setPostCategory, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "safety_alert", children: getText("Safety", "Seguridad") }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "observation", children: getText("Observation", "Observación") }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "question", children: getText("Question", "Pregunta") }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "discussion", children: getText("Discussion", "Discusión") })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "title", children: getText("Title (optional)", "Título (opcional)") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              OptimizedInput,
              {
                id: "title",
                textType: "text",
                value: postTitle,
                onChange: (e) => setPostTitle(e.target.value),
                placeholder: getText("Enter a title...", "Ingresa un título..."),
                maxLength: 200
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "content", children: getText("Content", "Contenido") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              OptimizedTextarea,
              {
                id: "content",
                textType: "text",
                value: postContent,
                onChange: (e) => setPostContent(e.target.value),
                placeholder: getText("What do you want to share?", "¿Qué quieres compartir?"),
                rows: 4,
                maxLength: 500
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-gray-500", children: [
              postContent.length,
              "/500 ",
              getText("characters", "caracteres")
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Image$1, { className: "w-4 h-4" }),
              getText("Images (optional)", "Imágenes (opcional)")
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              ImageUploader,
              {
                images: postImages,
                onImagesChange: setPostImages,
                maxImages: 3,
                disabled: isCreating,
                getText
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end space-x-2 pt-4 border-t mt-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              onClick: () => setShowCreatePost(false),
              disabled: isCreating,
              children: getText("Cancel", "Cancelar")
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: handleCreatePost,
              disabled: isCreating || !postContent.trim(),
              className: "bg-blue-600 hover:bg-blue-700",
              children: isCreating ? getText("Creating...", "Creando...") : getText("Create Post", "Crear Publicación")
            }
          )
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-6 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-gray-500", children: getText("Loading posts...", "Cargando publicaciones...") }) }) }) : filteredPosts.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-8 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-medium mb-2", children: getText("No posts yet", "Aún no hay publicaciones") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 mb-4", children: getText("Be the first to share something with the community!", "¡Sé el primero en compartir algo con la comunidad!") })
    ] }) }) : filteredPosts.map((post) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Card,
      {
        className: "profile-card-neumorph hover:shadow-md transition-shadow",
        style: {
          borderRadius: "14px",
          background: "#1e2327",
          boxShadow: "inset -5px 5px 9px #14171a, inset 5px -5px 9px #282f34",
          border: "1px solid #23272b"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          CardContent,
          {
            className: "p-4 cursor-pointer",
            onClick: () => openPostDetail(post),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start space-x-3 mb-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-10 h-10 rounded-full flex items-center justify-center overflow-hidden cursor-pointer hover:ring-2 hover:ring-blue-400 transition-all",
                    onClick: (e) => {
                      e.stopPropagation();
                      if (!post.is_anonymous && post.user_id) {
                        handleViewProfile(post.user_id);
                      }
                    },
                    children: getUserAvatar(post) ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: getUserAvatar(post),
                        alt: getDisplayName(post),
                        className: "w-full h-full object-cover rounded-full"
                      }
                    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-gray-600", children: getUserInitials(post) }) })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 min-w-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2 mb-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "font-medium text-sm cursor-pointer hover:text-blue-400 transition-colors",
                        onClick: (e) => {
                          e.stopPropagation();
                          if (!post.is_anonymous && post.user_id) {
                            handleViewProfile(post.user_id);
                          }
                        },
                        children: getDisplayName(post)
                      }
                    ),
                    !post.is_anonymous && post.user_id && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      UserRoleBadgeWrapper,
                      {
                        userId: post.user_id,
                        size: "xs",
                        showIcon: true,
                        className: "inline-block"
                      }
                    ) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      className: `text-xs ${getCategoryColor(post.category)} text-white`,
                      children: getCategoryLabel(post.category)
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center text-xs text-gray-500", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3 mr-1" }),
                    formatTimeAgo(post.created_at)
                  ] })
                ] }) })
              ] }),
              post.title && /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-lg mb-2 text-white", children: post.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white mb-3 whitespace-pre-wrap", children: post.content }),
              post.images && post.images.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(ImageGallery, { images: post.images, className: "mb-3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-2 border-t", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      variant: "ghost",
                      size: "sm",
                      className: `transition-colors ${userPostLikes.has(post.id) ? "text-red-500 hover:text-red-600" : "text-gray-500 hover:text-red-500"} ${likingInProgress.has(post.id) ? "opacity-50" : ""}`,
                      onClick: (e) => {
                        e.stopPropagation();
                        togglePostLike(post.id);
                      },
                      disabled: !user || likingInProgress.has(post.id),
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Heart,
                          {
                            className: `w-4 h-4 mr-1 transition-all ${userPostLikes.has(post.id) ? "fill-current" : ""}`
                          }
                        ),
                        post.like_count
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      variant: "ghost",
                      size: "sm",
                      className: "text-gray-500 hover:text-blue-500",
                      onClick: (e) => {
                        e.stopPropagation();
                        openPostDetail(post);
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-4 h-4 mr-1" }),
                        post.comment_count
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-gray-500 flex items-center", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ViewsIcon, { className: "w-3 h-3 mr-1" }),
                    post.view_count,
                    " ",
                    getText("views", "views")
                  ] }),
                  isAdmin() && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "ghost",
                      size: "sm",
                      className: `text-red-500 hover:text-red-600 ${deletingInProgress.has(post.id) ? "opacity-50" : ""}`,
                      onClick: (e) => {
                        e.stopPropagation();
                        deletePost(post.id);
                      },
                      disabled: deletingInProgress.has(post.id),
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(DeleteIcon, { className: "w-4 h-4" })
                    }
                  )
                ] })
              ] })
            ]
          }
        )
      },
      post.id
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showPostDetail, onOpenChange: setShowPostDetail, children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContent, { className: "w-full max-w-[96vw] xs:max-w-[92vw] sm:max-w-[480px] md:max-w-[520px] lg:max-w-[560px] max-h-[90vh] overflow-y-auto p-3 xs:p-4 sm:p-6 social-modal-content", children: selectedPost && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "social-modal-title text-base sm:text-lg md:text-xl font-semibold", children: selectedPost.title || getText("Community Post", "Publicación de la Comunidad") }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-b pb-4 mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start space-x-3 mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full flex items-center justify-center overflow-hidden", children: getUserAvatar(selectedPost) ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: getUserAvatar(selectedPost),
              alt: getDisplayName(selectedPost),
              className: "w-full h-full object-cover rounded-full"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-gray-600", children: getUserInitials(selectedPost) }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 min-w-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2 mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-sm", children: getDisplayName(selectedPost) }),
              !selectedPost.is_anonymous && selectedPost.user_id && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                UserRoleBadgeWrapper,
                {
                  userId: selectedPost.user_id,
                  size: "xs",
                  showIcon: true,
                  className: "inline-block"
                }
              ) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                className: `text-xs ${getCategoryColor(selectedPost.category)} text-white`,
                children: getCategoryLabel(selectedPost.category)
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center text-xs text-gray-500", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3 mr-1" }),
              formatTimeAgo(selectedPost.created_at)
            ] })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "social-modal-content-text text-white mb-3 whitespace-pre-wrap text-sm sm:text-base leading-relaxed", children: selectedPost.content }),
        selectedPost.images && selectedPost.images.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(ImageGallery, { images: selectedPost.images, className: "mb-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "ghost",
                size: "sm",
                className: `transition-colors ${userPostLikes.has(selectedPost.id) ? "text-red-500 hover:text-red-600" : "text-gray-500 hover:text-red-500"} ${likingInProgress.has(selectedPost.id) ? "opacity-50" : ""}`,
                onClick: () => togglePostLike(selectedPost.id),
                disabled: !user || likingInProgress.has(selectedPost.id),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Heart,
                    {
                      className: `w-4 h-4 mr-1 transition-all ${userPostLikes.has(selectedPost.id) ? "fill-current" : ""}`
                    }
                  ),
                  selectedPost.like_count,
                  " ",
                  getText("likes", "likes")
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-4 h-4 inline mr-1" }),
              selectedPost.comment_count,
              " ",
              getText("comments", "comentarios")
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center text-xs text-gray-500", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ViewsIcon, { className: "w-4 h-4 mr-1" }),
              selectedPost.view_count,
              " ",
              getText("views", "views")
            ] }),
            isAdmin() && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "sm",
                className: `text-red-500 hover:text-red-600 ${deletingInProgress.has(selectedPost.id) ? "opacity-50" : ""}`,
                onClick: () => deletePost(selectedPost.id),
                disabled: deletingInProgress.has(selectedPost.id),
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(DeleteIcon, { className: "w-4 h-4" })
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex space-x-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full flex items-center justify-center overflow-hidden", children: currentUserProfile?.avatar_url ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: currentUserProfile.avatar_url,
            alt: currentUserProfile.username || "User",
            className: "w-full h-full object-cover rounded-full"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-gray-600", children: currentUserProfile?.username?.charAt(0).toUpperCase() || "U" }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            OptimizedTextarea,
            {
              textType: "comment",
              value: newComment,
              onChange: (e) => setNewComment(e.target.value),
              placeholder: getText("Write a comment...", "Escribe un comentario..."),
              rows: 3,
              maxLength: 500,
              className: "social-modal-textarea text-sm sm:text-base resize-none"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-gray-500", children: [
              newComment.length,
              "/500 ",
              getText("characters", "caracteres")
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                onClick: handleAddComment,
                disabled: isPostingComment || !newComment.trim(),
                size: "sm",
                className: "social-modal-button bg-[#4fcbe9] hover:bg-[#4fcbe9]/90 text-white text-xs sm:text-sm px-3 sm:px-4",
                children: isPostingComment ? getText("Posting...", "Enviando...") : getText("Comment", "Comentar")
              }
            )
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "font-medium", children: [
          getText("Comments", "Comentarios"),
          " (",
          selectedPost.comment_count,
          ")"
        ] }),
        isLoadingComments ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-4 text-gray-500", children: getText("Loading comments...", "Cargando comentarios...") }) : comments.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-4 text-gray-500", children: getText(
          "No comments yet. Be the first to comment!",
          "Aún no hay comentarios. ¡Sé el primero en comentar!"
        ) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          (showAllComments ? getMainComments() : getMainComments().slice(0, 5)).map((comment) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex space-x-3 p-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-8 h-8 rounded-full flex items-center justify-center overflow-hidden cursor-pointer hover:ring-2 hover:ring-blue-400 transition-all",
                  onClick: (e) => {
                    e.stopPropagation();
                    if (!comment.is_anonymous && comment.user_id) {
                      handleViewProfile(comment.user_id);
                    }
                  },
                  children: comment.user_avatar_url && !comment.is_anonymous ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: comment.user_avatar_url,
                      alt: comment.user_username || "User",
                      className: "w-full h-full object-cover rounded-full"
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-gray-600", children: comment.is_anonymous ? "?" : comment.user_username?.charAt(0).toUpperCase() || "U" }) })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2 mb-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "span",
                      {
                        className: "font-medium text-sm cursor-pointer hover:text-blue-400 transition-colors",
                        onClick: (e) => {
                          e.stopPropagation();
                          if (!comment.is_anonymous && comment.user_id) {
                            handleViewProfile(comment.user_id);
                          }
                        },
                        children: [
                          comment.is_anonymous ? getText("Anonymous", "Anónimo") : comment.user_username ? `@${comment.user_username}` : getText("Unknown User", "Usuario Desconocido"),
                          comment.parent_comment_id && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-blue-400 text-xs ml-1", children: [
                            "· ",
                            getText("reply", "respuesta")
                          ] })
                        ]
                      }
                    ),
                    !comment.is_anonymous && comment.user_id && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      UserRoleBadgeWrapper,
                      {
                        userId: comment.user_id,
                        size: "xs",
                        showIcon: true,
                        className: "inline-block"
                      }
                    ) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-gray-500", children: formatTimeAgo(comment.created_at) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "social-modal-comment text-xs sm:text-sm whitespace-pre-wrap text-white leading-relaxed", children: comment.content }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2 mt-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      variant: "ghost",
                      size: "sm",
                      className: `text-xs p-1 h-auto transition-colors ${userCommentLikes.has(comment.id) ? "text-red-500 hover:text-red-600" : "text-gray-500 hover:text-red-500"} ${likingInProgress.has(comment.id) ? "opacity-50" : ""}`,
                      onClick: () => toggleCommentLike(comment.id),
                      disabled: !user || likingInProgress.has(comment.id),
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Heart,
                          {
                            className: `w-3 h-3 mr-1 transition-all ${userCommentLikes.has(comment.id) ? "fill-current" : ""}`
                          }
                        ),
                        comment.like_count
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "ghost",
                      size: "sm",
                      className: "text-xs text-gray-500 hover:text-blue-500 p-1 h-auto",
                      onClick: () => startReplyToComment(comment.id),
                      disabled: !user,
                      children: getText("Reply", "Responder")
                    }
                  )
                ] })
              ] })
            ] }),
            getReplyCount(comment.id) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ml-11 mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => toggleRepliesVisibility(comment.id),
                className: "text-gray-500 hover:text-gray-400 text-xs italic transition-colors",
                children: showRepliesFor.has(comment.id) ? getText("Hide replies", "Ocultar respuestas") : getText(`Show reply (${getReplyCount(comment.id)})`, `Mostrar respuesta (${getReplyCount(comment.id)})`)
              }
            ) }),
            showRepliesFor.has(comment.id) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ml-11 space-y-2 mb-3", children: getRepliesForComment(comment.id).map((reply) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gray-100 bg-opacity-10 rounded-2xl p-3 max-w-md", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex space-x-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-6 rounded-full flex items-center justify-center overflow-hidden", children: reply.user_avatar_url && !reply.is_anonymous ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: reply.user_avatar_url,
                  alt: reply.user_username || "User",
                  className: "w-full h-full object-cover rounded-full"
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-gray-600", children: reply.is_anonymous ? "?" : reply.user_username?.charAt(0).toUpperCase() || "U" }) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2 mb-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-xs", children: reply.is_anonymous ? getText("Anonymous", "Anónimo") : reply.user_username ? `@${reply.user_username}` : getText("Unknown User", "Usuario Desconocido") }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-gray-500", children: formatTimeAgo(reply.created_at) })
                ] }),
                !reply.is_anonymous && reply.user_id && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  UserRoleBadgeWrapper,
                  {
                    userId: reply.user_id,
                    size: "xs",
                    showIcon: true,
                    className: "inline-block"
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs whitespace-pre-wrap text-white", children: reply.content }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center space-x-1 mt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    variant: "ghost",
                    size: "sm",
                    className: `text-xs p-1 h-auto transition-colors ${userCommentLikes.has(reply.id) ? "text-red-500 hover:text-red-600" : "text-gray-500 hover:text-red-500"} ${likingInProgress.has(reply.id) ? "opacity-50" : ""}`,
                    onClick: () => toggleCommentLike(reply.id),
                    disabled: !user || likingInProgress.has(reply.id),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Heart,
                        {
                          className: `w-2 h-2 mr-1 transition-all ${userCommentLikes.has(reply.id) ? "fill-current" : ""}`
                        }
                      ),
                      reply.like_count
                    ]
                  }
                ) })
              ] })
            ] }) }, reply.id)) }),
            replyingToComment === comment.id && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ml-11 mb-3 space-y-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex space-x-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-6 rounded-full flex items-center justify-center overflow-hidden", children: currentUserProfile?.avatar_url ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: currentUserProfile.avatar_url,
                  alt: currentUserProfile.username || "User",
                  className: "w-full h-full object-cover rounded-full"
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-gray-600", children: currentUserProfile?.username?.charAt(0).toUpperCase() || "U" }) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  OptimizedTextarea,
                  {
                    textType: "comment",
                    value: replyContent,
                    onChange: (e) => setReplyContent(e.target.value),
                    placeholder: getText("Write a reply...", "Escribe una respuesta..."),
                    rows: 2,
                    maxLength: 500,
                    className: "text-sm"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mt-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-gray-500", children: [
                    replyContent.length,
                    "/500 ",
                    getText("characters", "caracteres")
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex space-x-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        variant: "outline",
                        size: "sm",
                        onClick: cancelReply,
                        disabled: isPostingReply,
                        className: "text-xs",
                        children: getText("Cancel", "Cancelar")
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        onClick: () => handleReplyToComment(comment.id),
                        disabled: isPostingReply || !replyContent.trim(),
                        size: "sm",
                        className: "bg-blue-600 hover:bg-blue-700 text-xs",
                        children: isPostingReply ? getText("Posting...", "Enviando...") : getText("Reply", "Responder")
                      }
                    )
                  ] })
                ] })
              ] })
            ] }) })
          ] }, comment.id)),
          getMainComments().length > 5 && !showAllComments && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "ghost",
              size: "sm",
              onClick: () => setShowAllComments(true),
              className: "text-blue-600 hover:text-blue-700",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-4 h-4 mr-1" }),
                getText(`Show ${getMainComments().length - 5} more comments`, `Mostrar ${getMainComments().length - 5} comentarios más`)
              ]
            }
          ) }),
          showAllComments && getMainComments().length > 5 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "sm",
              onClick: () => setShowAllComments(false),
              className: "text-blue-600 hover:text-blue-700",
              children: getText("Show less", "Mostrar menos")
            }
          ) })
        ] })
      ] })
    ] }) }) }),
    selectedUserId && /* @__PURE__ */ jsxRuntimeExports.jsx(
      UserProfileCard,
      {
        userId: selectedUserId,
        isOpen: isProfileCardOpen,
        onClose: () => {
          setIsProfileCardOpen(false);
          setSelectedUserId(null);
        }
      }
    )
  ] });
};
const CommunityScreen = () => {
  useNavigate();
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const { userRole, isMasterAdmin, isAdmin } = useUserRole();
  const { threads } = useCommunityThreads();
  const { reports } = useCommunityReports();
  const {
    createReport,
    confirmReport,
    rejectReport,
    deleteReport,
    isCreatingReport,
    isConfirmingReport,
    isRejectingReport,
    isDeletingReport
  } = useCommunityMutations();
  const [activeTab, setActiveTab] = reactExports.useState("social");
  const [selectedThreadId, setSelectedThreadId] = reactExports.useState(null);
  const [isAnonymous, setIsAnonymous] = reactExports.useState(false);
  const [showQuickReportForm, setShowQuickReportForm] = reactExports.useState(false);
  const [newReport, setNewReport] = reactExports.useState("");
  const [inputNewReport, setInputNewReport] = reactExports.useState("");
  const [reportPhoto, setReportPhoto] = reactExports.useState(null);
  const scrollContainerRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const handler = setTimeout(() => {
      setNewReport(inputNewReport);
    }, 300);
    return () => {
      clearTimeout(handler);
    };
  }, [inputNewReport]);
  const selectedThread = selectedThreadId ? threads.find((t2) => t2.id === selectedThreadId) : null;
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setTimeout(() => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 50);
  };
  const checkIfUserBlocked = async () => {
    try {
      const { data: profile, error } = await supabase.from("profiles").select("is_blocked, blocked_until").eq("id", user?.id).single();
      if (error) throw error;
      if (profile?.is_blocked) {
        const blockedUntil = profile.blocked_until ? new Date(profile.blocked_until) : null;
        if (!blockedUntil || blockedUntil > /* @__PURE__ */ new Date()) {
          return {
            isBlocked: true,
            message: blockedUntil ? `Вы заблокированы до ${new Date(blockedUntil).toLocaleDateString()}` : "Вы заблокированы"
          };
        }
      }
      return { isBlocked: false };
    } catch (error) {
      console.error("Error checking block status:", error);
      return { isBlocked: false };
    }
  };
  const submitQuickReport = async () => {
    const blockStatus = await checkIfUserBlocked();
    if (blockStatus.isBlocked) {
      toast({
        title: t("accessDenied"),
        description: blockStatus.message,
        variant: "destructive"
      });
      return;
    }
    if (!newReport.trim()) {
      toast({
        title: t("validationError"),
        description: t("fillAllFields"),
        variant: "destructive"
      });
      return;
    }
    try {
      await createReport.mutateAsync({
        description: newReport,
        photoUrl: reportPhoto || void 0,
        isAnonymous,
        location: { lat: 10.491, lng: -66.8792, address: t("yourLocation") }
      });
      setNewReport("");
      setInputNewReport("");
      setReportPhoto(null);
      setShowQuickReportForm(false);
      toast({
        title: t("reportTitle"),
        description: t("reportDesc")
      });
    } catch (error) {
      toast({
        title: t("errorTitle"),
        description: t("connectionError"),
        variant: "destructive"
      });
    }
  };
  const handleConfirmReport = async (reportId) => {
    try {
      const result = await confirmReport.mutateAsync(reportId);
      if (result?.action === "added") {
        if (result.overrode_rejection) {
          toast({
            title: t("confirmOverrideTitle"),
            description: t("confirmOverrideDesc")
          });
        } else {
          toast({
            title: t("confirmTitle"),
            description: t("confirmDesc")
          });
        }
      } else if (result?.action === "removed") {
        toast({
          title: t("confirmRemovedTitle"),
          description: t("confirmRemovedDesc")
        });
      }
    } catch (error) {
      console.error("Error confirming report:", error);
      toast({
        title: t("errorTitle"),
        description: error instanceof Error ? error.message : t("connectionError"),
        variant: "destructive"
      });
    }
  };
  const handleRejectReport = async (reportId) => {
    try {
      const result = await rejectReport.mutateAsync(reportId);
      if (result?.action === "added") {
        if (result.overrode_confirmation) {
          toast({
            title: t("rejectOverrideTitle"),
            description: t("rejectOverrideDesc")
          });
        } else {
          toast({
            title: t("rejectTitle"),
            description: t("rejectDesc")
          });
        }
      } else if (result?.action === "removed") {
        toast({
          title: t("rejectRemovedTitle"),
          description: t("rejectRemovedDesc")
        });
      }
    } catch (error) {
      console.error("Error rejecting report:", error);
      toast({
        title: t("errorTitle"),
        description: error instanceof Error ? error.message : t("connectionError"),
        variant: "destructive"
      });
    }
  };
  const handleDeleteReport = async (reportId) => {
    if (!isMasterAdmin && !isAdmin) return;
    if (window.confirm(t("deleteConfirm"))) {
      try {
        await deleteReport.mutateAsync(reportId);
      } catch (error) {
      }
    }
  };
  const handlePhotoUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setReportPhoto(e.target?.result);
      };
      reader.readAsDataURL(file);
    }
  };
  if (selectedThreadId && selectedThread && activeTab === "chat") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-dark flex flex-col", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      CommunityChat,
      {
        threadId: selectedThreadId,
        threadTitle: selectedThread.title,
        onBack: () => setSelectedThreadId(null)
      }
    ) }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-screen bg-dark flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-6 pb-2 flex items-center justify-center relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold text-white text-center w-full", children: t("communityTitle") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute right-4 top-1/2 -translate-y-1/2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LanguageToggle, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex bg-card/50 border-b border-border flex-shrink-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "ghost",
          className: `flex-1 py-4 rounded-none ${activeTab === "social" ? "text-[#f3533b] border-b-2 border-[#f3533b]" : "text-gray-400"}`,
          onClick: () => handleTabChange("social"),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4 mr-2" }),
            language === "es" ? "Social" : "Social"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "ghost",
          className: `flex-1 py-4 rounded-none ${activeTab === "reports" ? "text-[#f3533b] border-b-2 border-[#f3533b]" : "text-gray-400"}`,
          onClick: () => handleTabChange("reports"),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-4 h-4 mr-2" }),
            t("observations")
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full overflow-y-auto", ref: scrollContainerRef, children: activeTab === "social" ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-2 pb-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SocialFeed, {}) }) : activeTab === "chat" ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-2 pb-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      CommunityThreadList,
      {
        onSelectThread: setSelectedThreadId,
        selectedThreadId: selectedThreadId || void 0
      }
    ) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-2 pb-20 space-y-2 pt-2", children: [
      !showQuickReportForm && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: async () => {
            const blockStatus = await checkIfUserBlocked();
            if (blockStatus.isBlocked) {
              toast({
                title: t("accessDenied"),
                description: blockStatus.message,
                variant: "destructive"
              });
              return;
            }
            setShowQuickReportForm(true);
          },
          className: "w-full bg-[#f3533b] hover:bg-[#f3533b]/90 text-white py-3",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-5 h-5 mr-2" }),
            t("somethingStrange")
          ]
        }
      ),
      showQuickReportForm && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card/90 border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-white", children: t("quickReport") }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            OptimizedTextarea,
            {
              placeholder: t("whatNoticed"),
              value: inputNewReport,
              onChange: (e) => setInputNewReport(e.target.value),
              className: "bg-dark-light border-border text-white"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "photo-upload", className: "cursor-pointer", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2 text-gray-400 hover:text-white", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "w-4 h-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t("addPhoto") })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "photo-upload",
                type: "file",
                accept: "image/*",
                onChange: handlePhotoUpload,
                className: "hidden"
              }
            )
          ] }),
          reportPhoto && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: reportPhoto,
              alt: "Uploaded photo",
              className: "w-full h-32 object-cover rounded border border-border"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Switch,
              {
                id: "anonymous",
                checked: isAnonymous,
                onCheckedChange: setIsAnonymous
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "anonymous", className: "text-gray-400", children: t("sendAnonymously") })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex space-x-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                onClick: submitQuickReport,
                disabled: isCreatingReport,
                className: "flex-1 bg-[#f3533b] hover:bg-[#f3533b]/90",
                children: isCreatingReport ? t("creating") : t("warn")
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                onClick: () => setShowQuickReportForm(false),
                className: "border-border text-gray-400",
                children: t("cancel")
              }
            )
          ] })
        ] })
      ] }),
      reports.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center text-gray-500 py-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-12 h-12 mx-auto mb-4 opacity-50" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: t("observations") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: t("somethingStrange") })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: reports.map((report) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        Card,
        {
          className: "profile-card-neumorph",
          style: {
            borderRadius: "14px",
            background: "#1e2327",
            boxShadow: "inset -5px 5px 9px #14171a, inset 5px -5px 9px #282f34",
            border: "1px solid #23272b"
          },
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2", children: [
                report.is_anonymous ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-4 h-4 text-gray-400" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-white", children: t("anonymously") }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "text-xs", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-3 h-3 mr-1" }),
                    t("anonymously")
                  ] })
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    UserRoleBadgeWrapper,
                    {
                      userId: report.user_id,
                      showIcon: true,
                      className: "text-xs"
                    }
                  ),
                  report.user?.full_name && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-white text-xs", children: report.user.full_name })
                ] }),
                report.user_id === user?.id && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "border-blue-500 text-blue-400 text-xs", children: t("createdByYou") })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-gray-400", children: formatTimeAMPM(new Date(report.created_at)) }),
                (isMasterAdmin || isAdmin) && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "ghost",
                    size: "sm",
                    onClick: () => handleDeleteReport(report.id),
                    disabled: isDeletingReport,
                    className: "text-red-400 hover:text-red-300 hover:bg-red-500/10 p-1",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" })
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-300 mb-3", children: report.description }),
            report.photo_url && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: report.photo_url,
                alt: "Report photo",
                className: "w-full h-32 object-cover rounded border border-border mb-3"
              }
            ),
            report.location_address && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center text-xs text-gray-500 mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3 h-3 mr-1" }),
              report.location_address
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      variant: "outline",
                      size: "sm",
                      onClick: () => handleConfirmReport(report.id),
                      disabled: isConfirmingReport,
                      className: `transition-all duration-200 ${report.user_confirmed ? "border-green-500 text-green-500 bg-green-500/10 hover:bg-green-500/20" : "border-border text-gray-400 hover:text-white hover:border-green-500"}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ThumbsUp, { className: `w-4 h-4 mr-1 ${report.user_confirmed ? "fill-current" : ""}` }),
                        report.user_confirmed ? t("confirmed") : t("confirm")
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-gray-400", children: [
                    report.confirmations,
                    " ",
                    t("confirmations")
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      variant: "outline",
                      size: "sm",
                      onClick: () => handleRejectReport(report.id),
                      disabled: isRejectingReport,
                      className: `transition-all duration-200 ${report.user_rejected ? "border-red-500 text-red-500 bg-red-500/10 hover:bg-red-500/20" : "border-border text-gray-400 hover:text-white hover:border-red-500"}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ThumbsDown, { className: `w-4 h-4 mr-1 ${report.user_rejected ? "fill-current" : ""}` }),
                        report.user_rejected ? t("rejected") : t("reject")
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-gray-400", children: [
                    report.rejections || 0,
                    " ",
                    t("rejections")
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-start", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ReportCommentsSheet,
                  {
                    reportId: report.id,
                    commentsCount: report.comments_count || 0,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        variant: "outline",
                        size: "sm",
                        className: "border-border text-gray-400 hover:text-white hover:border-blue-500 hover:bg-blue-500/10 transition-all duration-200 hover:scale-105 active:scale-95",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-4 h-4 mr-1 transition-transform duration-200 group-hover:rotate-12" }),
                          t("comments")
                        ]
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-gray-400", children: [
                  report.comments_count || 0,
                  " ",
                  t("comments")
                ] })
              ] }) })
            ] })
          ] })
        },
        report.id
      )) })
    ] }) }) })
  ] });
};
export {
  CommunityScreen as default
};
