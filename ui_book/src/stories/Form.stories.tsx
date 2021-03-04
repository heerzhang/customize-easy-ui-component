/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import {InputGroup, Select, Input, TextArea, Check, InputDatalist, CheckSwitch, InputLine, SuffixInput} from "../Form";
import { Button } from "../Button";
import theme from "../Theme";
import { Layer } from "../Layer";
import { storiesOf } from "@storybook/react";
import { IconArrowRight, IconAlignCenter } from "../Icons";
import { IconButton } from "../IconButton";
import * as React from "react";
import {ComboBoxDatalist} from "../ComboBox";

export const FormStories = storiesOf("Forms", module)
  .add("input types", () => {
    const [query, setQuery] = React.useState('初始' );
  return(
      <div
      css={{
        display: "flex",
        justifyContent: "center",
        paddingTop: theme.spaces.xl,
        paddingBottom: theme.spaces.xl
      }}
    >
      <Layer css={{ maxWidth: "400px", width: "100%" }} elevation={"lg"}>
        <form css={{ padding: theme.spaces.lg }}>
          <InputGroup error="Required field" label="Email address">
            <Input placeholder="ben.mcmahen@gmail.com" />
          </InputGroup>

          <InputGroup label="Gender">
            <Select>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </Select>
          </InputGroup>

          <InputGroup label="Gender">
            <div>
              <Check label="Male" checked />
              <Check label="Female" />
              <Check label="Other" />
            </div>
          </InputGroup>

          <InputGroup
            label="Example textarea"
            helpText="Please provide a brief description of yourself. This will go on your profile."
          >
            <TextArea placeholder="Something about me" />
          </InputGroup>

          <InputGroup error="输入错" label="组合框">
            <InputDatalist placeholder="可输入也可选择"
                              value={ query }
                              onListChange={v => setQuery(v)}
                              datalist={["实际vals","22gle.com"]}

            >
            </InputDatalist>
          </InputGroup>

          <div css={{ textAlign: "right", marginTop: `${theme.spaces.md}` }}>
            <Button intent="primary">Submit</Button>
          </div>
        </form>
      </Layer>
    </div>
    ) ;
  } )

  .add("sizes", () => {
    return (
      <div
        css={{
          margin: "2rem",
          width: "800px",
          "& > div": {
            padding: "1rem",
            "& > *": {
              margin: "1rem"
            }
          }
        }}
      >
        <div>
          <Input
            css={{ display: "inline-block", width: "auto" }}
            defaultValue="hello world"
            inputSize="sm"
          />
          <Button size="sm">Small</Button>
          <Button component="a" href="#" size="sm">
            Small
          </Button>
          <Button
            component="a"
            href="#"
            size="sm"
            iconAfter={<IconArrowRight />}
          >
            Small
          </Button>
        </div>
        <div css={{ display: "flex", alignItems: "cente" }}>
          <Input
            css={{ display: "inline-block", width: "auto" }}
            defaultValue="hello world"
            inputSize="md"
          />
          <Button size="md">Medium</Button>
          <Button component="a" href="#" size="md">
            Medium
          </Button>
          <Button
            component="a"
            href="#"
            size="md"
            iconAfter={<IconArrowRight />}
          >
            Medium
          </Button>
          <IconButton icon={<IconAlignCenter />} label="Align center" />
        </div>
        <div>
          <Input
            css={{ display: "inline-block", width: "auto" }}
            defaultValue="hello world"
            inputSize="lg"
          />
          <Button size="lg">Large</Button>
          <Button component="a" href="#" size="lg">
            Large
          </Button>
          <Button
            component="a"
            href="#"
            size="lg"
            iconAfter={<IconArrowRight />}
          >
            Large
          </Button>
        </div>

        <div />
      </div>
    );
  })
  .add("disabled states", () =>{
        const [isCar, setisCar] = React.useState(undefined);
        const [大修周期, set大修周期] = React.useState(`12`);
    return (
    <div
      css={{
        display: "flex",
        justifyContent: "center",
        paddingTop: theme.spaces.xl,
        paddingBottom: theme.spaces.xl
      }}
    >
      <div css={{ overflowX: "auto" }}>
        <form css={{ display: "flex", padding: theme.spaces.lg }}>
          <div css={{ minWidth: "300px", margin: "1rem" }}>
            <InputGroup label="Email address">
              <Input placeholder="ben.mcmahen@gmail.com" />
            </InputGroup>
            <InputGroup label="Email address">
              <Input disabled placeholder="ben.mcmahen@gmail.com" />
            </InputGroup>
            <InputGroup error="This field is required" label="Email address">
              <Input placeholder="ben.mcmahen@gmail.com" />
            </InputGroup>
          </div>

          <div css={{ minWidth: "300px", margin: "1rem" }}>
            <InputGroup label="Gender">
              <Select>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </Select>
            </InputGroup>
            <InputGroup label="Gender">
              <Select disabled>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </Select>
            </InputGroup>
            <InputGroup error="This field is required" label="Gender">
              <Select multiple>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </Select>
            </InputGroup>
          </div>

          <div css={{ minWidth: "150px", margin: "1rem" }}>
            <InputGroup label="Gender">
              <div>
                <Check disabled label="Male" checked />
                <Check label="Female" />
                <Check label="Other" />
              </div>
            </InputGroup>

            <InputGroup error="新的switch" label="Gender">
              <div>
                <Check disabled label="Male" checked />
                <Check label="Female" />
                <Check label="Other" />
              </div>
            </InputGroup>
            <InputLine label={`是否汽车电梯:`}>
              <CheckSwitch  disabled={false}
                  checked= {isCar  || false}
                     onChange={e => {
                        setisCar(isCar? undefined:true);
                      }
                  }
              />
            </InputLine>
            <InputLine  label='报告地址自动获得链接:' >
              <SuffixInput
                  type="number"
                  value={ 大修周期 || ''}
                  onChange={e => set大修周期( e.currentTarget.value||undefined ) }
              >个月</SuffixInput>
            </InputLine>

          </div>
          <div css={{ minWidth: "300px", margin: "1rem" }}>
            <InputGroup
              label="Example textarea"
              helpText="Please provide a brief description of yourself. This will go on your profile."
            >
              <TextArea placeholder="Something about me" />
            </InputGroup>
            <InputGroup
              label="Example textarea"
              helpText="Please provide a brief description of yourself. This will go on your profile."
            >
              <TextArea disabled placeholder="Something about me" />
            </InputGroup>
            <InputGroup
              error="This field is required"
              label="Example textarea"
              helpText="Please provide a brief description of yourself. This will go on your profile."
            >
              <TextArea placeholder="Something about me" />
            </InputGroup>
            <div css={{ textAlign: "right", marginTop: `${theme.spaces.md}` }}>
              <Button disabled intent="primary">
                Submit
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
  }
  )
  .add("测试Inputline", () => {
      const [query, setQuery] = React.useState('初始' );
      const [大修周期, set大修周期] = React.useState(`12`);
      const [isCar, setisCar] = React.useState(undefined);
      return(
          <div
              css={{
                display: "flex",
                justifyContent: "center",
                paddingTop: theme.spaces.xl,
                paddingBottom: theme.spaces.xl
              }}
          >
            <Layer css={{ maxWidth: "400px", width: "100%" }} elevation={"lg"}>
              <form css={{ padding: theme.spaces.lg }}>
                <InputGroup error="Required field" label="Email address">
                  <Input placeholder="ben.mcmahen@gmail.com" />
                </InputGroup>

                <InputGroup label="Gender">
                  <Select>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </Select>
                </InputGroup>

                <InputGroup label="Gender">
                  <div>
                    <Check label="Male" checked readOnly />
                    <Check label="Female" />
                    <Check label="Other" />
                  </div>
                </InputGroup>

                <InputGroup
                    label="Example textarea"
                    helpText="Please provide a brief description of yourself. This will go on your profile."
                >
                  <TextArea placeholder="Something about me" />
                </InputGroup>
                <InputLine label={`是否汽车电梯:`}>
                  <CheckSwitch  disabled={false}
                                checked= {isCar  || false}
                                onChange={e => {
                                  setisCar(isCar? undefined:true);
                                }
                                }
                  />
                </InputLine>
                <InputLine  label='报告地址自动获得链接:' >
                  <SuffixInput
                      type="number"
                      value={ 大修周期 || ''}
                      onChange={e => set大修周期( e.currentTarget.value||undefined ) }
                  >个月</SuffixInput>
                </InputLine>
                <InputGroup error="输入错" label="组合框">
                  <InputDatalist placeholder="可输入也可选择"
                                 value={ query }
                                 onListChange={v => setQuery(v)}
                                 datalist={["实际vals","22gle.com"]}

                  >
                  </InputDatalist>
                </InputGroup>

                <div css={{ textAlign: "right", marginTop: `${theme.spaces.md}` }}>
                  <Button intent="primary">Submit</Button>
                </div>
              </form>
            </Layer>
          </div>
      ) ;
    } );

