/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import { storiesOf } from "@storybook/react";
import defaultTheme from "../Theme";
import {IconActivity, IconAirplay, IconAlertOctagon, IconMoreVertical, IconPackage} from "../Icons";
import { useState, useRef } from "react";
import { Pager } from "../Pager";
import {ScrollView, ScrollViewHandles} from "../ScrollView";
import * as React from "react";
import { Layer } from "../Layer";
import { Toolbar } from "../Toolbar";
import { Text } from "../Text";
import { Tabs, Tab } from "../Tabs";
import { List, ListItem } from "../List";
import { Avatar } from "../Avatar";
import { Badge } from "../Badge";
import * as faker from "faker";
import { Link as RouterLink ,useLocation} from "wouter";
import {ResponsivePopover} from "../Popover";
import {MenuDivider, MenuItem, MenuList} from "../Menu";
import {IconButton} from "../IconButton";
import {useToast} from "../Toast";

export const ScrollViewStories = storiesOf("ScrollView", module)
  .add("within gesture", () => {
    return <Example />;
  })
  .add("overflowY", () => <Direction />)
  .add("animated scroll", () => <AnimatedScroll />)
  .add("tabs example", () => <TabsExample />);

function Example() {
  const [index, setIndex] = useState(0);
  return (
    <div css={{ width: "200px" }}>
      <Pager
        css={{ height: "400px " }}
        value={index}
        onRequestChange={i => setIndex(i)}
      >
        <div css={{ flex: 1, background: "green" }}>
          <ScrollView overflowX>
            <div css={{ width: "300px", background: "yellow" }}>
              this scrolls i guess expe Aute fugiat esse nulla enim esse
              reprehenderit do.
            </div>
          </ScrollView>
        </div>

        <div css={{ flex: 1, background: "red" }} />
      </Pager>
    </div>
  );
}

function Direction() {
  const [index, setIndex] = useState(0);
  return (
    <div css={{ width: "200px" }}>
      <Pager
        css={{ height: "400px " }}
        value={index}
        onRequestChange={i => setIndex(i)}
      >
        <div css={{ flex: 1, background: "green" }}>
          <ScrollView overflowY css={{ height: "200px" }}>
            <div css={{ height: "400px", background: "yellow" }}>
              this scrolls i guess expe Aute fugiat esse nulla enim esse
              reprehenderit do.
            </div>
          </ScrollView>
        </div>

        <div css={{ flex: 1, background: "red" }} />
      </Pager>
    </div>
  );
}

function AnimatedScroll() {
  const ref = useRef<ScrollViewHandles>(null);

  function scroll() {
    console.log(ref);
    ref.current!.scrollTo(undefined, 400);
  }

  return (
    <ScrollView css={{ height: "300px" }} overflowY  innerRef={ref}>
      <div css={{ height: "600px" }}>
        some scroll content
        <button onClick={scroll}>scroll to 300</button>
      </div>
      <React.Fragment>
        <button onClick={() => ref.current!.scrollTo(undefined, 0)}>
          scroll to 0
        </button>
      </React.Fragment>
    </ScrollView>
  );
}

function TabsExample() {
    const [tab, setTab] = useState(0);
    const [, setLocation] = useLocation();
    const toast = useToast();
    const isActive=true;

  return (
    <Layer className="List-example">
      <Toolbar className="List-toolbar">
        <Text gutter={false} variant="h6">
          My Chat App
        </Text>
      </Toolbar>

      <Tabs variant="evenly-spaced" onChange={i => setTab(i)} value={tab}>
        <Tab id={"family"}>Family</Tab>
        <Tab id="work">Work</Tab>
        <Tab id="fav">Favorites</Tab>
        <Tab id="groups">Groups</Tab>
      </Tabs>

      <div>
        <List>
          <ListItem
            contentBefore={
              <Avatar name={"Lynn Apple"} src={faker.image.avatar()} />
            }
            primary="Lynn Apple"
            wrap={false}
            secondary="Proident irure cupidatat cupidatat elit eiusmod mollit."
            contentAfter={<Badge>1</Badge>}
          />
          <ListItem
            contentBefore={
              <Avatar name={"Mary Joe"} src={faker.image.avatar()} />
            }
            primary="Mary Joe"
            wrap={false}
            secondary="Proident irure cupidatat cupidatat elit eiusmod mollit."
            contentAfter={<Badge>4</Badge>}
          />

        <ListItem
                   wrap={false}
                   contentBefore={
                       <Avatar name={"Mary Joe"} src={faker.image.avatar()} />
                   }
                   primary={
                       `报告 ${isActive||''}`
                   }
                   secondary={"后" ||''}
                   contentAfter={
                       <ResponsivePopover
                           content={
                               <MenuList>
                                   <MenuItem >删除
                                   </MenuItem>
                                   <MenuDivider />
                                   <MenuItem contentBefore={<IconPackage />}  onPress={() => {
                                       toast({
                                           title: "要跳转网页链接"
                                       });
                                       setLocation("/?path=/story/alert--color-variants", { replace: true } );
                                   } }>
                                       提交审核
                                   </MenuItem>
                               </MenuList>
                           }
                       >
                           <IconButton variant="ghost" size={'md'}
                               icon={<IconMoreVertical />}
                               label="菜单"
                           />
                       </ResponsivePopover>
                   }
        />

        </List>
      </div>
    </Layer>
  );
}
