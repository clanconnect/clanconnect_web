import React, { useEffect } from 'react';
import Header from 'components/DemoHeader';
import SideNav from 'components/DemoSideNav';
import Breadcrumb from 'components/Breadcrumb';
import CreativeTable from 'components/CreativeTable';
import { getAllCreativesAction } from 'redux/brands/creatives/actions';

import './styles.scss';
import { useSelector, useDispatch } from 'react-redux';

const AllCreativesLists = (props) => {
  const dispatch = useDispatch();
  const { allCreativeDetails } = useSelector((store) => store.creatives);
  useEffect(() => {
    dispatch(getAllCreativesAction());
  }, []);

  console.log(allCreativeDetails, 'list page');
  return (
    <div className='main-wrapper'>
      <Header />
      <div className='flex top-space-commom'>
        <SideNav />
        <div className='content-wrapper'>
          <Breadcrumb text={`All Creatives`} />

          <div className='list-wrapper'>
            <div>
              <h2 className='list-title'>All Creatives</h2>
            </div>
            <CreativeTable influencerFlowTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllCreativesLists;
