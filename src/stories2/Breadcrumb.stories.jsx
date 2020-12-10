"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @jsx jsx */
var react_1 = require("@emotion/react");
var react_2 = require("@storybook/react");
var Breadcrumbs_1 = require("../Breadcrumbs");
var Link_1 = require("../Link");
exports.BreadcrumbStories = react_2.storiesOf("Breadcrumb", module)
    .add("Basic usage", function () {
    return (<div css={{ display: "flex", justifyContent: "center" }}>
        <Breadcrumbs_1.Breadcrumbs>
          <Breadcrumbs_1.BreadcrumbItem>
            <Link_1.Link href="#">Watershed</Link_1.Link>
          </Breadcrumbs_1.BreadcrumbItem>
          <Breadcrumbs_1.BreadcrumbItem>
            <Link_1.Link href="#">Visual Teaching Strategies</Link_1.Link>
          </Breadcrumbs_1.BreadcrumbItem>
          <Breadcrumbs_1.BreadcrumbItem>Settings</Breadcrumbs_1.BreadcrumbItem>
        </Breadcrumbs_1.Breadcrumbs>
      </div>);
})
    .add("Large", function () {
    return (<div css={{ display: "flex", justifyContent: "center" }}>
        <Breadcrumbs_1.Breadcrumbs size="lg">
          <Breadcrumbs_1.BreadcrumbItem>
            <Link_1.Link href="#">Watershed</Link_1.Link>
          </Breadcrumbs_1.BreadcrumbItem>
          <Breadcrumbs_1.BreadcrumbItem>
            <Link_1.Link href="#">Visual Teaching Strategies</Link_1.Link>
          </Breadcrumbs_1.BreadcrumbItem>
          <Breadcrumbs_1.BreadcrumbItem>Settings</Breadcrumbs_1.BreadcrumbItem>
        </Breadcrumbs_1.Breadcrumbs>
      </div>);
});
