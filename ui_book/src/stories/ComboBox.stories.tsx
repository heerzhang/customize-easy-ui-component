/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import * as React from "react";
import { Avatar, AvatarSizes } from "../Avatar";
import faker from "faker";
import { storiesOf } from "@storybook/react";
import {
    ComboBox, ComboBoxDatalist,
    ComboBoxInput,
    ComboBoxList,
    ComboBoxOption,
    ComboBoxOptionText
} from "../ComboBox";
import {Input, InputBase, InputDatalist, InputGroup, InputRefBase} from "../Form";
import { Text } from "../Text";
import { ListItem } from "../List";

export const ComboBoxStories = storiesOf("ComboBox", module)
  .add("basic", () => {
    return <Example />;
  })
  .add("list item", () => <CustomExample />)
    .add("Like InputDatalist", () => <ListExample />);

const defaultEntries = new Array(100).fill(null).map(() => ({
  id: faker.random.uuid(),
  name: faker.name.firstName() + " " + faker.name.lastName(),
  image: faker.image.avatar()
}));

function Example() {
  const [entries, setEntries] = React.useState(defaultEntries);
  const [query, setQuery] = React.useState('初始文字' );

  const toRender = !query
    ? []
    : entries
        .filter(
          entry => entry.name.toLowerCase().indexOf(query.toLowerCase()) > -1
        )
        .slice(0, 10);

  return (
    <div css={{ margin: "3rem auto", width: "30rem" }}>
      <ComboBox
        autocomplete={false}
        query={query||''}
        onQueryChange={v => {
          setQuery(v);
        }}
        onSelect={v => {
         v&&setQuery(v);
        }}
      >
        <ComboBoxInput
          aria-label="Query users"
          placeholder="Search for users"
          readOnly={false}
        />

        {query && (
          <ComboBoxList aria-label="Query users">
            {toRender.length ? (
              toRender.map(entry => {
                return (
                  <ComboBoxOption value={entry.name} key={entry.id} >
                  </ComboBoxOption>
                );
              })
            ) : (
              <div>
                <Text
                  muted
                  css={{ display: "block", padding: "0.5rem 0.75rem" }}
                >
                  {query && toRender.length === 0 ? (
                    <span>No entries found.</span>
                  ) : (
                    <span>Try searching for users by email or name.</span>
                  )}
                </Text>
              </div>
            )}
          </ComboBoxList>
        )}
      </ComboBox>
    </div>
  );
}

function CustomExample() {
  const [entries, setEntries] = React.useState(defaultEntries);
  const [query, setQuery] = React.useState("");

  const toRender = !query
    ? []
    : entries
        .filter(
          entry => entry.name.toLowerCase().indexOf(query.toLowerCase()) > -1
        )
        .slice(0, 8);

  return (
    <div css={{ margin: "3rem auto", width: "30rem" }}>
      <ComboBox
        query={query}
        onQueryChange={v => {
          setQuery(v);
        }}
        onSelect={v => {
          setQuery(v);
        }}
      >
        <ComboBoxInput
          aria-label="Query users"
          placeholder="Search for users"
          component={InputRefBase}
          autoComplete={"true"}
        />

        {query && (
          <ComboBoxList aria-label="Query users">
            {toRender.length ? (
              toRender.map(entry => {
                return (
                  <ComboBoxOption
                    css={{ padding: 0 }}
                    value={entry.name}
                    key={entry.id}
                  >
                    <ListItem
                      interactive={false}
                      primary={<ComboBoxOptionText value={entry.name} />}
                      contentBefore={
                        <Avatar size="sm" name={entry.name} src={entry.image} />
                      }
                    />
                  </ComboBoxOption>
                );
              })
            ) : (
              <div>
                <Text
                  muted
                  css={{ display: "block", padding: "0.5rem 0.75rem" }}
                >
                  {query && toRender.length === 0 ? (
                    <span>No entries found.</span>
                  ) : (
                    <span>Try searching for users by email or name.</span>
                  )}
                </Text>
              </div>
            )}
          </ComboBoxList>
        )}
      </ComboBox>
    </div>
  );
}

function ListExample() {
    const [entries, setEntries] = React.useState(defaultEntries);
    const [query, setQuery] = React.useState("");

    const toRender = !query
        ? []
        : entries
            .filter(
                entry => entry.name.toLowerCase().indexOf(query.toLowerCase()) > -1
            )
            .slice(0, 10);

    return (
        <div css={{ margin: "3rem auto", width: "30rem" }}>
            <ComboBoxDatalist placeholder="可输入也可选择"
                  value={ query || ''}
                  onListChange={v => setQuery( v||undefined ) }
                  datalist={["实际vals","22gle.com"]}
            >
            </ComboBoxDatalist>
        </div>
    );
}
