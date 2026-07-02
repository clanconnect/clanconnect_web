'use client';
import {useState, useRef} from 'react';

import TeamMembersData from './TeamMembersData';
import Row from 'react-bootstrap/Row';

function TeamMembersComponent() {
  let [memberDetail, setMemberDetail] = useState(false);
  let [memberInfo, setMemberInfo] = useState([]);
  const violationRef = useRef(null);
  let [memberDetailId, setMemberDetailId] = useState(memberInfo);

  const HandleTeamMemberDetail = (id) => {
    const newItem = TeamMembersData.filter((newVal) => {
      return newVal.id === id;
    });
    setMemberInfo(newItem);
    setMemberDetail(!memberDetail);
    violationRef.current.scrollIntoView({behavior: 'smooth', block: 'end'});
    setMemberDetailId(newItem[0].id);
    console.log('memberDetailId', memberDetailId);
    console.log('newItem', newItem[0].id);
  };

  return (
    <section className='team-member-slider'>
      <h2 className='text-center'>Business Drivers</h2>
      <Row className='team-member-tab-sec'>
        {TeamMembersData.slice(5).map((data) => (
          <a
            href='javascript:void(0)'
            className='TeamMember-info'
            key={data.id}
          >
            <div className='TeamMember-info-img-indl'>
              <img
                src={data.teamMemberImg}
                className='TeamMember-Img'
                alt={data.teamMemberName}
              />
            </div>
            <div className='TeamMember-info-indl'>
              <span className='TeamMember-info-indl-name'>
                {data.teamMemberName}
              </span>
              <span className='TeamMember-info-indl-des'>
                {data.teamMemberDesignation}
              </span>
            </div>
          </a>
        ))}
      </Row>
      <h2 className='text-center'>Our Geeks</h2>
      <Row className='team-member-tab-sec'>
        {TeamMembersData.slice(0, 5).map((data) => (
          <a
            href='javascript:void(0)'
            onClick={() => HandleTeamMemberDetail(data.id)}
            className='TeamMember-info'
            key={data.id}
          >
            <div className='TeamMember-info-img-indl'>
              <img
                src={data.teamMemberImg}
                className='TeamMember-Img'
                alt={data.teamMemberName}
              />
            </div>
            <div className='TeamMember-info-indl'>
              <span className='TeamMember-info-indl-name'>
                {data.teamMemberName}
              </span>
              <span className='TeamMember-info-indl-des'>
                {data.teamMemberDesignation}
              </span>
            </div>
          </a>
        ))}
      </Row>
      <div></div>
    </section>
  );
}

export default TeamMembersComponent;
