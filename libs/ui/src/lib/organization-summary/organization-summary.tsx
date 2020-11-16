import React from 'react';
import {Link} from "@material-ui/core";
import {Project} from "@maze/api-interfaces";
import {
  Twitter, GitHub, Facebook, LinkedIn, Telegram, YouTube,
  Link as LinkIcon
} from "@material-ui/icons";
import SimpleTable from "../simple-table/simple-table";

/* eslint-disable-next-line */
export interface OrganizationSummaryProps {
  project: Project
}

const iconChooser = link => {
  if (link.match(/twitter/)) {
    return (<Twitter/>);
  } else if (link.match(/t(elegram)?\.me/)) {
    return (<Telegram/>);
  } else if (link.match(/youtu/)) {
    return (<YouTube/>);
  } else if (link.match(/github/)) {
    return (<GitHub/>);
  } else if (link.match(/(fb|facebook)/)) {
    return (<Facebook/>);
  } else if (link.match(/linked/)) {
    return (<LinkedIn/>);
  } else {
    return (<LinkIcon/>);
  }
}

export const OrganizationSummary = (props: OrganizationSummaryProps) => {
  const {project} = props;
  return (
    <SimpleTable
      label="Owner"
      data={[
        {label: "Organization", content: project.organization},
        {
          label: "Website",
          content: (<Link href={project.website} target="_blank" rel="nofollow">{project.website}</Link>)
        },
        {
          label: "Social links", content: project.social.map(link => (
              <Link href={link} target="_blank" rel="nofollow"
                    style={{marginRight: 10}}
              >{iconChooser(link)}</Link>
            ))
        },
        {label: "Short description", content: project.shortDesc}
      ]}
    />
  );
};

export default OrganizationSummary;
