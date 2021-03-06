/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import * as React from "react";
import { Button } from "../Button";
import { List, ListItem, ListSection } from "../List";
import { storiesOf } from "@storybook/react";
import { Layer } from "../Layer";
import theme from "../Theme";
import faker from "faker";
import { Avatar } from "../Avatar";
import { ToggleDarkMode } from "./ToggleDarkMode";
import { Divider } from "../Divider";
import { Link as RouterLink } from "wouter";

export const CollapseStories = storiesOf("List", module)
  .add("basic", () => {
    return (
      <div>
        <Layer
          elevation="sm"
          css={{ overflow: "hidden", width: "100%", borderRadius: 0 }}
        >
          <List>
            <ListSection title="Hello world">
              <ListItem
                contentBefore={
                  <Avatar name={"Ben McMahen"} src={faker.image.avatar()} />
                }
                primary="Ben McMahen"
                secondary="Minim do minim cupidatat veniam aliquip sunt exercitation enim nisi nulla."
              />
              <ListItem
                contentBefore={
                  <Avatar name={"Ben McMahen"} src={faker.image.avatar()} />
                }
                primary="Joe Chen"
                secondary="Proident irure cupidatat cupidatat elit eiusmod mollit."
              />
            </ListSection>
            <Divider muted />
            <ListSection title="Hello world">
              <ListItem
                contentBefore={
                  <Avatar name={"Ben McMahen"} src={faker.image.avatar()} />
                }
                primary="Joe Chen"
                secondary="Proident irure cupidatat cupidatat elit eiusmod mollit."
              />
              <ListItem
                contentBefore={
                  <Avatar name={"Ben McMahen"} src={faker.image.avatar()} />
                }
                primary="Joe Chen"
                secondary="Proident irure cupidatat cupidatat elit eiusmod mollit."
              />
            </ListSection>
          </List>
        </Layer>
      </div>
    );
  })
  .add("no wrap", () => {
    return (
      <Layer css={{ overflow: "hidden", width: "450px" }}>
        <div
          css={{
            height: "1.5rem",
            borderBottom: "1px solid",
            borderBottomColor: theme.colors.border.muted
          }}
        />
        <List>
          <ListItem
            contentBefore={
              <Avatar name={"Ben McMahen"} src={faker.image.avatar()} />
            }
            primary="Ben McMahen"
            wrap={false}
            secondary="Minim do minim cupidatat veniam aliquip sunt exercitation enim nisi nulla."
          />
          <ListItem
            wrap={false}
            contentBefore={
              <Avatar name={"Ben McMahen"} src={faker.image.avatar()} />
            }
            primary="Joe Chen"
            secondary="Proident irure cupidatat cupidatat elit eiusmod mollit."
          />
          <ListItem
            wrap={false}
            contentBefore={
              <Avatar name={"Ben McMahen"} src={faker.image.avatar()} />
            }
            primary="Joe Chen"
            secondary="Proident irure cupidatat cupidatat elit eiusmod mollit."
          />
          <ListItem
            wrap={false}
            contentBefore={
              <Avatar name={"Ben McMahen"} src={faker.image.avatar()} />
            }
            primary="Joe Chen"
            secondary="Proident irure cupidatat cupidatat elit eiusmod mollit."
          />
        </List>
      </Layer>
    );
  })
  .add("support links", () => {
    return (
      <Layer css={{ overflow: "hidden", width: "450px" }}>
        <div
          css={{
            height: "1.5rem",
            borderBottom: "1px solid",
            borderBottomColor: theme.colors.border.muted
          }}
        />
        <List>
          <ListItem
            component="a"
            href="/"
            contentBefore={
              <Avatar name={"Ben McMahen"} src={faker.image.avatar()} />
            }
            primary="Ben McMahen"
            wrap={false}
            secondary="Minim do minim cupidatat veniam 1."
          />
          <ListItem
            wrap={false}
            contentBefore={
              <Avatar name={"Ben McMahen"} src={faker.image.avatar()} />
            }
            primary="Joe Chen"
            secondary="Proident irure cupidatat cupidatat elit eiusmod mollit."
          />
        <RouterLink to="/">
            <ListItem noBind
                wrap={false}
                contentBefore={
                    <Avatar name={"Heerzhang"} src={faker.image.avatar()} />
                }
                primary="跳转后报错"
                secondary="Proident irure cupidatat cupidatat elit eiusmod mollit."
            />
        </RouterLink>
          <ListItem
            wrap={false}
            contentBefore={
              <Avatar name={"Ben McMahen"} src={faker.image.avatar()} />
            }
            primary="Joe Chen"
            secondary="Proident irure cupidatat cupidatat elit eiusmod mollit."
          />
        </List>
      </Layer>
    );
  })
  .add("Single label", () => (
    <List>
      <ListItem
        contentBefore={
          <Avatar name={"Ben McMahen"} src={faker.image.avatar()} />
        }
        primary="Ben McMahen"
        wrap={false}
      />
    </List>
  ));

export const ExampleList = () => (
  <List>
    <ListItem
      contentBefore={<Avatar name={"Ben McMahen"} />}
      primary="Ben McMahen"
      wrap={false}
      secondary="Minim do minim cupidatat veniam aliquip sunt exercitation enim nisi nulla."
    />
    <ListItem
      wrap={false}
      contentBefore={<Avatar name={"Charles Taylor"} />}
      primary="Charles Taylor"
      secondary="Proident irure cupidatat cupidatat elit eiusmod mollit."
    />
    <ListItem
      wrap={false}
      contentBefore={<Avatar name={"Karl Marx"} />}
      primary="Karl Marx"
      secondary="Proident irure cupidatat cupidatat elit eiusmod mollit."
    />
    <ListItem
      wrap={false}
      contentBefore={<Avatar name={"Roger Scruton"} />}
      primary="Roger Scruton"
      secondary="Proident irure cupidatat cupidatat elit eiusmod mollit."
    />
    <ListItem
      wrap={false}
      contentBefore={<Avatar name={"Martha Nussbaum"} />}
      primary="Martha Nussbaum"
      secondary="Proident irure cupidatat cupidatat elit eiusmod mollit."
    />
    <ListItem
      wrap={false}
      contentBefore={<Avatar name={"David Hume"} />}
      primary="David Hume"
      secondary="Proident irure cupidatat cupidatat elit eiusmod mollit."
    />
    <ListItem
      wrap={false}
      contentBefore={<Avatar name={"Simone de Beauvior"} />}
      primary="Simone de Beauvoir"
      secondary="Proident irure cupidatat cupidatat elit eiusmod mollit."
    />
  </List>
);
