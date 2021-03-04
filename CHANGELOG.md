## 4.4.0
React.forwardRef有性能负担，部分呈现数量较多的组件改成不传递ref的普通组件，原版本可注入ref的组件就改名字；
注意ResponsivePopover/Popover/Tooltip组件唯一儿子须用能传入ref的按钮,比如IconButton改成IconRefButton，Button改成ButtonRefComp;
ResponsivePopover底下按钮需要传递ref; 否则定位不能跟随按钮， 用IconRefButton代替普通IconButton;
加新组件LabelText,CCell等,InputGroupLine改名InputLine自适应大小。
## 4.3.6
 新增加组合框形式的InputDatalist组件，并且和ComboBoxDatalist组件保持一致，能简单替换
## 4.3.0
- 大幅度修改，全面更新最新版本的依赖，故事书独立成一个子工程了。
- 丢弃对commonjs规范的支持，保留ES Module的方式，目标改为ES2015。
## 4.0.0
- Compare the old and new versions, and modify theme.mediaqueries. Old version SM > = 567, MD > = 768, LG > = 992, XL > = 1200. But the new version SM < = 319, MD > = 629, LG > = 1120, XL > = 1440. The new version defaults to 320 to 628px, which just fits the width of the phone.

- 新旧版本比较，对theme.mediaQueries.进行修改。旧版本sm>=567,md>=768,lg>=992,xl>=1200。但是新版本sm<=319,md>=629,lg>=1120,xl>=1440。新版本缺省值320到628px，正好适配手机宽度。
## 3.6.0
- InputGroup 大幅度修改，支持自适应。
## 3.5.4

- Update `Stack` to better support gestures.

## 3.5.3

- Use a `button` tag when `type=submit` is used on a `Button`.

## 3.5.2

- Fix `useFocusLock` hook to prevent unwanted focusing.

## 3.5.1

- `ComboBox` now accepts an autocomlete prop, and `ComboBoxInput` uses a `BaseInput` by default.

## 3.5.0

- Add `ComboBox`, `usePositioner` and improve `useMeasure`.

## 3.4.0

- Rename `GestureStack` to `Pager`
- use new scroll-lock hook

## 3.3.2

- Update Stack to fix measurement issues

## 3.3.1

- Fix `Stack` dropshadow in dark mode

## 3.3.0

- Added `Stack`
- `ScrollView` now accepts arbitrary props (for things like styling)

## 3.2.0

- Added `Skeleton`, `AlertDialog`, and `useInfiniteScroll` hook.
- Start using `useCallback` in more places to ensure better performance.

## 3.1.1

- Update react-spring, react-gesture-view, toasted-notes

## 3.1.0

- Upgrade react-gesture-view and react-gesture-responder. This enables users to disable gestures for GestureView.
- Fix disabled form states
- Improve input error appearances

## 3.0.0

#### Breaking changes

- Replace TabContent and ReactSwipeableView with our own `GestureView` component. Because GestureView uses the pan-responder-hook it works better with our other gestures.
- `DarkMode` and `LightMode` now forward refs and props. Unfortunately, this requires that both components only accept a single child which results in a breaking change.
