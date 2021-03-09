/** @jsxImportSource @emotion/react */
import {
  InputGroup,
  Select,
  Input,
  TextArea,
  Check,
  InputDatalist,
  CheckSwitch,
  SuffixInput,
  InputLine
} from "../Form";
import { Text } from "../Text";
import { Button } from "../Button";
import theme from "../Theme";
import { Layer } from "../Layer";
import { storiesOf } from "@storybook/react";
import { IconArrowRight, IconAlignCenter } from "../Icons";
import { IconButton } from "../IconButton";
import * as React from "react";
import {ComboBox, ComboBoxDatalist, ComboBoxInput, ComboBoxList, ComboBoxOption} from "../ComboBox";
import {LineColumn} from "../LineColumn";
import {  css } from "@emotion/react";


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
            <Input placeholder="ben.mcmahen@gmail.com"
                   required
            />
          </InputGroup>

          <InputGroup label="Gender">
            <Select required >
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
            <TextArea placeholder="Something about me"
                      required
            />
          </InputGroup>

          <InputGroup error="输入错" label="组合框">
            <InputDatalist placeholder="可输入也可选择"
                              value={ query }
                              onListChange={v => setQuery(v)}
                              datalist={["实际vals","22gle.com"]}

            >
            </InputDatalist>
          </InputGroup>
          <InputGroup  label="看Email address">
            <Input placeholder="必填字段ben.mcmahen@gmail.com"
                   required
            />
          </InputGroup>

          <div css={{ textAlign: "right", marginTop: `${theme.spaces.md}` }}>
            <Button intent="primary" type="submit">提交</Button>
          </div>
          <div css={{ textAlign: "right", marginTop: `${theme.spaces.md}` }}>
            <Input     type={'submit'}
            />
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
  .add("组参数 states", () =>{
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
              error="必须输入该字段；没错不显示"
              label="标签抬头extarea，基本都应该有的！"
              helpText="Please provide a brief 说明解释文本； 没的说明就不显示."
            >
              <TextArea placeholder="输入框还也是能自带说明提示" />
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
      const [船梯, set船梯] = React.useState(undefined);
      const toRender = ["实际vals","asdsafasdcomfsdfdffsdfsdf"];
      return(
          <div
              css={{
                display: "flex",
                justifyContent: "center",
                paddingTop: theme.spaces.xl,
                paddingBottom: theme.spaces.xl
              }}
          >
            <Layer css={{ width: "100%" }} elevation={"lg"}>
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
                <InputLine  label='外部的获得链接报告地址:' >
                  <SuffixInput
                      type="number"
                      value={ 大修周期 || ''}
                      onChange={e => set大修周期( e.currentTarget.value||undefined ) }
                  >个月</SuffixInput>
                </InputLine>
                <LineColumn column={3}
                >
                  <Text>任意的文本看，hkhdfgfdjkjh水电费水电费看</Text>
                  <InputLine label="Gender输入也可选">
                    <Select>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </Select>
                  </InputLine>
                  <InputLine  label='第二版本获得接报告,内部的:' helpText={'说明等等4从vv'}>
                    <SuffixInput
                        type="number"
                        value={ 大修周期 || ''}
                        onChange={e => set大修周期( e.currentTarget.value||undefined ) }
                    >个月</SuffixInput>
                  </InputLine>
                  <InputLine error="输入错" label="InputDatalist组合框">
                    <InputDatalist placeholder="可输入也可选择"
                                   value={ query }
                                   onListChange={v => setQuery(v)}
                                   datalist={["实际vals","asdsafasdcomfsdfdffsdfsdf"]}

                    >
                    </InputDatalist>
                  </InputLine>

                  <InputLine label="是不是船梯" helpText={'dfgf从vv'}>
                    <CheckSwitch  checked= {船梯 || false}
                                  onChange={e => set船梯(船梯? undefined:true) } />
                  </InputLine>
                  <InputLine  label='what about得接 报告,内部的:' helpText={'说明等等4从vv'}>
                    <SuffixInput
                        type="number"
                        value={ 大修周期 || ''}
                        onChange={e => set大修周期( e.currentTarget.value||undefined ) }
                    >个月</SuffixInput>
                  </InputLine>
                  <InputLine error="输入错" label="第二种两个做法ComboBoxDatalist的组合框">
                    <ComboBoxDatalist placeholder="可输入也可选择"
                                   value={ query }
                                   onListChange={v => setQuery(v)}
                                   datalist={["说得好","asdsafasdcomfsdfdffsdfsdf"]}
                    >
                    </ComboBoxDatalist>
                  </InputLine>

                  <InputLine error="This field is required" label="Gender multiple">
                    <Select multiple>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </Select>
                  </InputLine>

                  <InputLine label="Look是船梯" helpText={'dfgf从vv'}>
                    <CheckSwitch  checked= {船梯 || false}
                                  onChange={e => set船梯(船梯? undefined:true) } />
                  </InputLine>
                  <InputLine label="报错的Gender，进行样式测试用">
                    <div css={{
                        flex: '1 1 20%',
                        backgroundColor: 'grey'
                      }}
                    >

                        <Check label="Male" checked readOnly />
                        <Check label="Female" />
                        <Check label="Other" />
                    </div>
                  </InputLine>
                  <InputLine  label='第二版本获得接报告,内部的:' helpText={'说明等等4从vv'}>
                    <SuffixInput
                        type="number"
                        value={ 大修周期 || ''}
                        onChange={e => set大修周期( e.currentTarget.value||undefined ) }
                    >个月</SuffixInput>
                  </InputLine>

                  <InputLine
                      label="Example textarea"
                      helpText="Please provide a brief description of yourself. This will go on your profile."
                  >
                    <TextArea placeholder="Something textarea" />
                  </InputLine>
                  <InputLine label="进行样式测试用">
                      <Check label="单独一个的" />
                  </InputLine>

                  <InputLine error="最早版本的能兼容" label="原版本的的组合框ComboBox">
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
                                toRender.map((entry,i) => {
                                  return (
                                      <ComboBoxOption value={entry} key={i} >
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
                  </InputLine>

                  <InputLine helpText="Required field" label="Email yourselfdescriptionaddress profile">
                    <Input type={'file'} placeholder="最基本的 input" />
                  </InputLine>

                </LineColumn>
                <div css={{ textAlign: "right", marginTop: `${theme.spaces.md}` }}>
                  <Button intent="primary">Submit</Button>
                </div>
              </form>
            </Layer>
          </div>
      ) ;
    } );

