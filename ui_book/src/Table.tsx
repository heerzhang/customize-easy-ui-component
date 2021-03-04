/** @jsxImportSource @emotion/react */
import {  css } from "@emotion/react";
import * as React from "react";
import { Layer } from "./Layer";
import PropTypes from "prop-types";
import { useTheme } from "./Theme/Providers";
import {ElementType} from "react";

type SectionTypeVariants = "TableHead" | "TableBody";

interface TableSectionContextType {
  type: SectionTypeVariants;
}

//没有对外输出TableSectionContext的；无法import {TableSectionContext} from "customize-easy-ui-component";
const TableSectionContext = React.createContext<TableSectionContextType>({
  type: "TableHead"
});

//旧版本的Table才需要使用到的 context变量； 新版本已经改成参数适应;
const TableContext = React.createContext({ fixed: false });

/**
 * A Table provides a useful abstraction for managing rows and columns.
 */

interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
    /** An optional minimum width for table content.
     * 配置表格的最小宽度，小于它就启用水平滚动条。 举例：minWidth=css 单位。
     *  */
    minWidth?: string;
    /** An optional array of fixed layout widths for each column
     * 非打印场景的必须看fixed； 打印场景优先使用printColWidth；若这两者都没定义那就是系统自动的。
     * 百分比% 和数值px两种形式。 举例：fixed={["8%","23%","%","12%"] }  printColWidth={["60","156","700","80"]}
     * */
    fixed?: string[];
    //打印场景才采用的： 敲定的列宽on printer case,set just as fixed  above; 3种形式[pixels, %, relative_length];
    printColWidth?: string[];
}

//等待删除 代码
//@Deprecated
const TableOld: React.FunctionComponent<TableProps> = ({
  children,
  minWidth,
  fixed,
  ...other
}) => {
  const theme = useTheme();

  return (
    <div
      css={{
        width: "100%",
        display: "block",
        overflowX: minWidth ? "auto" : "initial"
      }}
    >
      <table
        css={{
          borderSpacing: 0,
          borderCollapse: "separate",
          width: "100%",
          fontFamily: theme.fonts.base,
          WebkitAppearance: "none",
          WebkitFontSmoothing: "antialiased",
          display: "table",
          minWidth,
          tableLayout: fixed ? "fixed" : undefined
        }}
        {...other}
      >
        {fixed && (
          <colgroup>
            {fixed.map((width, i) => {
              return <col key={i} width={width} />;
            })}
          </colgroup>
        )}
        <TableContext.Provider value={{ fixed: fixed ? true : false }}>
          {children}
        </TableContext.Provider>
      </table>
    </div>
  );
};

/**
支持打印自适应，支持手机自适应。
 */
export const Table: React.FunctionComponent<TableProps> = ({
                                                               children,
                                                               minWidth,
                                                               fixed,
                                                               printColWidth,
                                                               ...other
                                                           }) => {
    const theme = useTheme();

    return (
        <div
            css={{
                width: "100%",
                display: "block",
                overflowX: minWidth ? "auto" : "initial"
            }}
        >
            <table
                css={{
                    borderSpacing: 0,
                    borderCollapse: "separate",
                    width: "100%",
                    fontFamily: theme.fonts.base,
                    WebkitAppearance: "none",
                    WebkitFontSmoothing: "antialiased",
                    display: "table",
                    minWidth,
                    tableLayout: fixed ? "fixed" : undefined,
                    "@media print": {
                        tableLayout: printColWidth ? "fixed" : fixed? "fixed" : undefined,
                    }
                }}
                {...other}
            >
                {fixed && (
                    <colgroup
                        css={{
                            "@media print": {
                                display: printColWidth ?  'none' : undefined,
                            },
                        }}
                    >
                        {fixed.map((width, i) => {
                            return <col key={i} width={width} />;
                        })}
                    </colgroup>
                )}

                {printColWidth && (
                    <colgroup
                        css={{
                            "@media not print": {
                                display: 'none',
                            },
                            "@media print": {
                                display: undefined,
                            },
                        }}
                    >
                        {printColWidth.map((width, i) => {
                            return <col key={i} width={width} />;
                        })}
                    </colgroup>
                )}

                {children}

            </table>
        </div>
    );
};


Table.propTypes = {
    minWidth: PropTypes.string,
    fixed: PropTypes.arrayOf(PropTypes.string),
    printColWidth: PropTypes.arrayOf(PropTypes.string),
    children: PropTypes.node
};

/**
 * A TableHead is used to render column labels in a table.
 */

type TableHeadProps = React.HTMLAttributes<HTMLTableSectionElement>;

export function TableHead({ children, ...other }: TableHeadProps) {
  return (
    <thead
      css={{
        display: "table-header-group"
      }}
      {...other}
    >
      <TableSectionContext.Provider value={{ type: "TableHead" }}>
        {children}
      </TableSectionContext.Provider>
    </thead>
  );
}

interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  /** A callback when a row is selected */
  onClick?: () => void;
}

export const TableRow: React.FunctionComponent<TableRowProps> = ({
  onClick,
  children,
  ...other
}) => {
  const theme = useTheme();
  const { type: tableSectionType } = React.useContext(TableSectionContext);

  const buttonProps = onClick
    ? {
        role: "button",
        tabIndex: 0
      }
    : {};

  return (
    <tr
      onClick={onClick}
      css={{
        height: tableSectionType === "TableHead" ? "31px" : "49px",
        display: "table-row",
        outline: "none",
        verticalAlign: "middle",
        cursor: onClick ? "pointer" : "default",
        ":hover": {
          background: onClick ? theme.colors.background.tint1 : "none"
        }
      }}
      {...buttonProps}
      {...other}
    >
      {children}
    </tr>
  );
};

TableRow.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node
};

/**
 * Cell TableCell, used for both <td> and <th> elements.
 * textAlign: "justify" 导致字间距自动变大，感觉不规整，不如textAlign: "left"。
 */

const tableCellAlignments = {
  right: css({
    textAlign: "right",
    flexDirection: "row-reverse"
  }),
  left: css({
    textAlign: "left"
  }),
  center: css({
    textAlign: "center"
  }),
  justify: css({
    textAlign: "justify"
  })
};

type AlignCellType = "right" | "left" | "center" | "justify";

type tableCellVariants = "head" | "body";

type TableCellBaseProps = React.ThHTMLAttributes<HTMLTableHeaderCellElement> &
  React.TdHTMLAttributes<HTMLTableDataCellElement>;

interface TableCellProps extends TableCellBaseProps {
  align?: AlignCellType;
  //align?: keyof typeof tableCellAlignments;
  variant?: tableCellVariants;
  ellipsis?: boolean;
  component?: React.ElementType<TableCellBaseProps>;
}

/**
 * 旧版本的Cell组件，新版本改用Cell; 两个版本的样式不一样
 */
export const TableCell: React.FunctionComponent<TableCellProps> = ({
  align = "left",
  variant,
  component,
  ellipsis,
  children,
  ...other
}) => {
  const theme = useTheme();
  const { type: tableSectionType } = React.useContext(TableSectionContext);

  const Component =
    component || (tableSectionType === "TableHead" ? "th" : "td");

  const type = variant || (tableSectionType === "TableHead" ? "head" : "body");

  return (
    <Component
      css={[
        {
          zIndex: 4,
          position: "relative",
          borderBottom: "1px solid",
          borderColor:
            tableSectionType === "TableBody"
              ? theme.colors.border.muted
              : theme.colors.border.default,
          display: "table-cell",
          padding: `${theme.spaces.xs} ${theme.spaces.sm}`,
          [theme.mediaQueries.lg]: {
            paddingLeft: theme.spaces.md,
            paddingRight: theme.spaces.md
          },
          ":last-child": {
            paddingRight: theme.spaces.md
          }
        },
        ellipsis && {
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          overflow: "hidden"
        },
        type === "head"
          ? {
              fontWeight: 500,
              fontSize: theme.fontSizes[0],
              color: theme.colors.text.muted
            }
          : {
              fontWeight: 400,
              fontSize: theme.fontSizes[0],
              color: theme.colors.text.default
            },
        tableCellAlignments[align]
      ]}
      scope="col"
      {...other}
    >
      {children}
    </Component>
  );
};

TableCell.propTypes = {
  align: PropTypes.oneOf(["right","left","center","justify"] as AlignCellType[]),
  variant: PropTypes.oneOf(["body", "head"] as tableCellVariants[]),
 // component: PropTypes.element,
  ellipsis: PropTypes.bool,
  children: PropTypes.node
};
/*可以通过interface来约定react组件props，还有必要用react的propTypes吗？
2个会报类型错误？TableCell.propTypes {align: PropTypes.oneOf( ； component: PropTypes.elementType,}
 这个地方似乎是打包层次用到的。  报错？只好删除了。
 可以只用typescript进行验证，也可以只用prop-types进行验证，也可以两者混搭进行验证，这个并没用严格限制。
首先不管用typescript，还是prop-types，都只在开发模式下进行检查。 PropTypes是组件接收prop的约束。
*/

/**
 * 新版 TableCell 组件，支持手机上作表格形式的报告，支持打印。
 * 做报表用的样式, CCell, RCell类似 Cell,就差align格式;
 * 旧版本请用TableCell组件,两个版本的样式不一样
 */
export const Cell: React.FunctionComponent<TableCellProps> = ({
                                                                  align = "left",
                                                                  variant,
                                                                  component,
                                                                  ellipsis,
                                                                  children,
                                                                  ...other
                                                              }) => {
    const theme = useTheme();
    const { type: tableSectionType } = React.useContext(TableSectionContext);

    const Component =
        component || (tableSectionType === "TableHead" ? "th" : "td");

    const type = variant || (tableSectionType === "TableHead" ? "head" : "body");

    return (
        <Component
            css={[
                {
                    zIndex: 4,
                    position: "relative",
                    border: "1px solid",
                    display: "table-cell",
                    padding: `${theme.spaces.xs} ${theme.spaces.xs}`,
                },
                ellipsis && {
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    overflow: "hidden"
                },
                type === "head"
                    ? {
                        fontWeight: 500,
                        fontSize: theme.fontSizes[0],
                        color: theme.colors.text.muted
                    }
                    : {
                        fontWeight: 400,
                        fontSize: theme.fontSizes[0],
                        color: theme.colors.text.default
                    },
                tableCellAlignments[align]
            ]}
            scope="col"
            {...other}
        >
            {children}
        </Component>
    );
};


/**
 * TableBody - indicates the body (and scrollable) portion of our table.
 */

type TableBodyProps = React.HTMLAttributes<HTMLTableSectionElement>;

export function TableBody({ children, ...other }: TableBodyProps) {
  return (
    <tbody
      css={{
        display: "table-row-group"
      }}
      {...other}
    >
      <TableSectionContext.Provider value={{ type: "TableBody" }}>
        {children}
      </TableSectionContext.Provider>
    </tbody>
  );
}

/**
 * An ExpandingRow displays additional content about the row when clicked.
 */

interface ExpandingRowProps {
  /** The expanded content to show when the user selects the row */
  content: (close: () => void) => React.ReactNode | React.ReactNode;
  children: React.ReactNode;
}

export const ExpandingRow: React.FunctionComponent<ExpandingRowProps> = ({
  content,
  children
}) => {
  const theme = useTheme();
  const [selected, setSelected] = React.useState(false);

  function close() {
    setSelected(false);
  }

  function open() {
    setSelected(true);
  }

  return (
    <TableBody>
      <TableRow onClick={open}>{children}</TableRow>
      {selected && (
        <tr css={{ display: "table-row", height: "100px" }}>
          <td
            colSpan={React.Children.count(children)}
            css={{
              borderBottom: 0,
              width: "inherit",
              padding: 0,
              position: "relative"
            }}
          >
            <div
              css={{
                zIndex: 3,
                width: "inherit",
                position: "relative",
                paddingBottom: "24px"
              }}
            >
              <div
                css={{
                  position: "relative",
                  whiteSpace: "normal",
                  height: "auto",
                  display: "block",
                  paddingTop: "24px"
                }}
              >
                {typeof content === "function" ? content(close) : content}
              </div>
            </div>
            <Layer
              css={{
                position: "absolute",
                top: "-49px",
                left: "-16px",
                right: "-16px",
                borderRadius: theme.radii.md,
                bottom: 0,
                zIndex: 2
              }}
            >
              {null}
            </Layer>
          </td>
        </tr>
      )}
    </TableBody>
  );
};

//被删除的部分 xxx.propTypes = {  };  是和rollup.js相关，一个模块打包工具/发布工具库，使用ES6的模块标准。

ExpandingRow.propTypes = {
  //content: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  children: PropTypes.node
};


/**
大量重复的组件标签，简化: CCell代表居中显示的Cell
 */
export const CCell: React.FunctionComponent<TableCellProps> =
(
    {
     align = "center",
     variant,
     component,
     ellipsis,
     children,
     ...other
 }) =>
{

    return (
        Cell({
            align,
            variant,
            component,
            ellipsis,
            children,
            ...other
        })
    );
};


/**做点简化，免得看起来是一大堆重复性质代码：
 * 代表靠右边 显示的Cell
 */
export const RCell: React.FunctionComponent<TableCellProps> =
(
    {
     align = "right",
     variant,
     component,
     ellipsis,
     children,
     ...other
 }) =>
{

    return (
        Cell({
            align,
            variant,
            component,
            ellipsis,
            children,
            ...other
        })
    );
};


