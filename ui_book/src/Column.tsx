/** @jsxImportSource @emotion/react */
import * as React from "react";
import PropTypes from "prop-types";
import { LayoutMediaQueryFactory } from '@s-ui/react-layout-media-query'
import ResizeReporter from 'react-resize-reporter'
import {LayerElevations} from "./Layer";
import {Button} from "./Button";

/*
 列式布局: column
 布局子孙都是平等的，宽度都平均分配，预期高度在同一行排列也是均衡整齐或高度一致的，
 父窗口宽度不确定的， 具体显示几个列是自适应的，最多列数固定。
 列数动态确定， 之后的子孙实际宽度都是铺满的100%。
 不使用滚动条的，大尺寸元素上 都没有固定数值的px;
子孙的宽度没有固定px的，布局组件的子孙都是可在宽度上做自适应的。只有目标多少列排列是敲定固定的，也就是预期最大父窗口宽度场合可以安排最多几个列的元素。
 宽度上 竟然小到了1列都放不下了， fitable=true传递给子孙；
子孙输入Line组件的断线折腰宽度在布局组件上就的设置switchPx参数。
布局组件来传递进来布局紧凑与否参数fitable。也就是遇到最小最小的父窗口宽度情形，在只安排单列元素场合下的，给输入Line组件紧凑提示。
 最后一行：非满格的 落单子孙个数， 居中？，宽度协调一致。
 最多列数是应用场景 程序敲定， 大概会放得下几个列啊{已经考虑了需求上级大的布局切换需求后，反正就是最大可能性几个列}。
*/



function validChildrenCount(children: any) {
    return React.Children.toArray(children).filter(child =>
        React.isValidElement(child)
    ).length;
}


interface Line1ColumnProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The contents of the layer */
  children: React.ReactNode;
    //根据换行px数 ，来切换显示2个显示模式。 缺省>=360px 正常模式，否则紧凑模式。
    switchPx?: number;
}

/**
 * 父辈窗口屏幕宽度就算再大，也是只安排1个列的，布局思路。
 * Line1Column,... Line5Column
 */
export const Line1Column: React.FunctionComponent<Line1ColumnProps> =(
    {
        children,
        switchPx=336,
        ...other
    }
) => {
    //const theme = useTheme();
    const [fitable, setFitable] = React.useState(true);
    //必须加一层div{{ position: 'relative' }}，后面给出的宽度才对的。
    return (
        <div style={{ position: 'relative' }}>
            <ResizeReporter reportInit onWidthChanged={(width)=>{
                setFitable((width>=switchPx) );
                ///console.log('zheli width=',width,"fitable=",fitable,"setFF=", (width>=switchPx));
            }
            }
            />
            {
                React.Children.map(children, (child, i) => {
                    if (!React.isValidElement(child)) {
                        return child;
                    }
                    return React.cloneElement(child as any, {
                        fitable: fitable
                    });
                })
            }
        </div>
    );
};

Line1Column.displayName = "Line1Column";

Line1Column.propTypes = {
  children: PropTypes.node
};


interface Line5ColumnProps extends React.HTMLAttributes<HTMLDivElement> {
    /** 预计父窗口最大可以放下列数安排： must >=2 and <=5 */
    column?: number;
    /** The contents of the layer */
    children: React.ReactNode;
    //根据换行px数 ，来切换显示2个显示模式。 缺省>=360px 正常模式，否则紧凑模式。
    //switchPx == breaks[0] 假如父窗口太小 小于1个列的，小于breaks[0] 就是紧凑模式,
    //自定义； 列数调整实际的父窗口宽度px,每个列一个。
    breaks?: number[];
}

const flexClPp=[100,50,33.333,25,20];
//缺省breaks ： <Line5Column column={2} breaks={[288, 520]}
const defaultBreakOf=[
    [336,880],
    [314,628,942],
    [292,584,876,1168],
    [240,480,720,960,1200],
];
/**
 * 布局组件：最多5列的。
 * 2列，3列，4列，5列。
 * 父辈窗口屏幕宽度就算再大，也是只安排2 或3 或4 或5 个列的，布局思路。

 * 特别注意！！ Line5Column底下的子组件第一个div或者<tag>的样式请不要使用padding和margin的设置px;
 * 用InputLineL来代替InputGroup因为其内部section默认padding:48px 20px所以会导致布局宽度分配不一致。
 */
export const Line5Column: React.FunctionComponent<Line5ColumnProps> =(
    {
        column=2,
        children,
        breaks=defaultBreakOf[column-2],
        ...other
    }
) => {
    //const theme = useTheme();
    const [fitable, setFitable] = React.useState(true);
    //最适合搞几个列。
    const [suitableCls, setSuitableCls] = React.useState(2);
    console.log("Render fitable=",fitable,"suitableCls=",suitableCls);
    //有效的儿子组件:
    const kids =React.Children.toArray(children).filter(child =>{
        if(!React.isValidElement(child))
            throw new Error("literal text must be wrapped in <></> tag or Components");
        return  child;
        }
    );
    const sonCount= kids.length;
    const lineSum= Math.ceil(sonCount/suitableCls);
    console.log('断定的 breaks=',breaks,"lineSum=",lineSum,"suitableCls=",suitableCls);
    if(column>5 || column<2)
        throw new Error("number of columns must >=2 and <=5");
    //必须加一层div{{ position: 'relative' }}，后面给出的宽度才对的。
    return (
        <div style={{ position: 'relative' }}>
            <ResizeReporter reportInit onWidthChanged={(width)=>{
                    let i=0;
                    for(;i<column;i++)
                        if(width<breaks[i])  break;
                    setSuitableCls(i);
                    setFitable( i>0 );
              } }
            />

            { suitableCls>1 ?
                new Array(lineSum).fill(null).map((one,row) => (
                    <div key={row}
                         css={{
                             display: 'flex',
                             justifyContent: 'space-around',
                             alignItems: 'center'
                         }}
                    >
                    {
                        new Array(suitableCls).fill(null).map((each,clm) => {
                                if (kids[row * suitableCls + clm]) {
                                    return React.cloneElement(kids[row * suitableCls + clm] as any, {
                                        style: {flex: `1 1 ${flexClPp[suitableCls-1]}%` }
                                    })
                                }
                                else
                                  return <div key={clm}
                                         css={{ flex: `1 1 ${flexClPp[suitableCls-1]}%` }}
                                    />;
                            }
                        )
                    }
                    </div>
                ))
                :
                kids.map((one,row) =>
                     React.cloneElement(one as any, {
                         fitable: fitable
                        })
                )
            }
        </div>
    );
};


Line5Column.displayName = "Line5Column";

