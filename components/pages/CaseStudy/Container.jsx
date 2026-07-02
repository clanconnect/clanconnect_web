'use client';
import React, {useState, useEffect} from 'react';
import {Link, useParams} from '@/lib/router';
import { caseStudyData } from '../../../data/data';
import RetinaImage from '@/lib/RetinaImage';
import Skeleton from 'react-loading-skeleton';

const CaseStudyContainer = (props) => {
  const [caseStudyCategory, setcaseStudyCategory] = useState('All');
  const [loading, setLoading] = useState(false);
  

  const handleTabClick = (category) => {
    setcaseStudyCategory(category);
  };
  useEffect(() => {
    const addClass = document.querySelector('body');
    addClass.classList.add('common-bg-page');

    // Cleanup function to remove the class when the component is unmounted
    return () => {
      addClass.classList.remove('common-bg-page');
    };
  }, []);
  const filteredCategories =
    caseStudyCategory === 'All'
      ? caseStudyData.caseStudyList
      : caseStudyData.caseStudyList.filter(
          (caseStudy) => caseStudy.category === caseStudyCategory
        );
  return (
    <>
      <div className='homeBanner homeBannerLatest inner news'>
        <div className='container'>
          <div className='banner-content'>
            <h1 className='banner-innerpage-heading'>Case Studies</h1>
          </div>
        </div>
      </div>

      <div className='banner-case-study'>
        <div className='d-block d-lg-none mb-4 w-100 px-3'>
          <select
            className='form-control'
            value={caseStudyCategory}
            onChange={(e) => handleTabClick(e.target.value)}
          >
            <option value='All'>All</option>
            <option value='Automobile'>Automobile</option>
            <option value='Beauty & Personal Care'>
              Beauty & Personal Care
            </option>
            <option value='Fashion'>Fashion</option>
            <option value='FMCG'>FMCG</option>
            <option value='Lifestyle & Travel'>Lifestyle & Travel</option>
            <option value='Tech & Fin'>Technology & Finance</option>
          </select>
        </div>

        <div className='case-study-category-tab-sec d-none d-lg-flex'>
          <button
            className={`${
              caseStudyCategory === 'All'
                ? 'case-study-category-tab active'
                : 'case-study-category-tab'
            }`}
            onClick={() => handleTabClick('All')}
          >
            All
          </button>
          <button
            className={`${
              caseStudyCategory === 'Automobile'
                ? 'case-study-category-tab active'
                : 'case-study-category-tab'
            }`}
            onClick={() => handleTabClick('Automobile')}
          >
            Automobile
          </button>
          <button
            className={`${
              caseStudyCategory === 'Beauty & Personal Care'
                ? 'case-study-category-tab active'
                : 'case-study-category-tab'
            }`}
            onClick={() => handleTabClick('Beauty & Personal Care')}
          >
            Beauty & Personal Care
          </button>
          <button
            className={`${
              caseStudyCategory === 'Fashion'
                ? 'case-study-category-tab active'
                : 'case-study-category-tab'
            }`}
            onClick={() => handleTabClick('Fashion')}
          >
            Fashion
          </button>
          <button
            className={`${
              caseStudyCategory === 'FMCG'
                ? 'case-study-category-tab active'
                : 'case-study-category-tab'
            }`}
            onClick={() => handleTabClick('FMCG')}
          >
            FMCG
          </button>
          <button
            className={`${
              caseStudyCategory === 'Lifestyle & Travel'
                ? 'case-study-category-tab active'
                : 'case-study-category-tab'
            }`}
            onClick={() => handleTabClick('Lifestyle & Travel')}
          >
            Lifestyle & Travel
          </button>
          <button
            className={`${
              caseStudyCategory === 'Tech & Fin'
                ? 'case-study-category-tab active'
                : 'case-study-category-tab'
            }`}
            onClick={() => handleTabClick('Tech & Fin')}
          >
            Technology & Finance
          </button>
        </div>
        <ul className='case-study-list'>
        {filteredCategories?.slice()?.reverse()?.map((caseStudy) => {
            return (
              <li key={caseStudy.id}>
                <Link
                  to={`/case_studies/case_study_detail/${caseStudy.id}`}
                >
                  <div className='case-study-logo-container'>
                    {/* <img className='case-study-logo' src={caseStudy.logoImg} alt={caseStudy.title} /> */}
                    <RetinaImage className="case-study-logo"
                      src={[caseStudy.logoImg, caseStudy.logoImg2x, caseStudy.logoImg3x]} alt={caseStudy.title} />
                  </div>
                  
                  <div className='case-study-info'>
                    <div className='case-study-info-top' style={{ borderBottom: `${caseStudy.influencersCount ? "1px solid #00000029" : ""}`}}>
                      {caseStudy.views &&
                        <div className='case-study-info-top-value'>
                          <strong>{caseStudy.views}</strong>
                          <span>Views</span>
                        </div>
                      }
                      {caseStudy.engagementRate &&
                        <div className='case-study-info-top-value'>
                          <strong>{caseStudy.engagementRate}</strong>
                          <span>ER</span>
                        </div>
                      }
                      {caseStudy.cpv &&
                        <div className='case-study-info-top-value'>
                          <strong><i className="bi bi-currency-rupee"></i>{caseStudy.cpv}</strong>
                          <span>CPV</span>
                        </div>
                      }
                      
                      {caseStudy.engagement &&
                        <div className='case-study-info-top-value'>
                          <strong>{caseStudy.engagement}</strong>
                          <span>Engagement</span>
                        </div>  
                      }
                    </div>
                    {caseStudy.influencersCount &&
                      <div className='case-study-info-btm'>
                        <strong>{caseStudy.influencersCount} <span>{caseStudy.influencersCount > 1 ? "Influencers" : "Influencer"}</span></strong>
                      </div>
                    }
                  </div>
                  {caseStudy.inflImg &&
                  <>
                  <div className='case-study-award'>

                  </div>
                    <div className='case-study-infl'>
                      {/* {caseStudy?.inflImg && <div className='case-study-infl-img-cont'>
                      <img src={caseStudy.inflImg} alt={caseStudy.title} /> 
                      </div>}
                      {caseStudy?.inflImg1 && <div className='case-study-infl-img-cont'>
                      <img src={caseStudy?.inflImg1} alt={caseStudy.title} />
                      </div>} */}
                      <div className='page-case-study-banner-right'>
                        {caseStudy?.images?.slice(0,4).map((ima, index) => {
                          return <div key={ima.id} className={`case-study-banner-img case-study-banner-img${index + 1}`}>
                            {!loading && <img src={ima.img} alt={caseStudy.title} />}
                            {loading && <Skeleton style={{ borderRadius: '10px' }} height={300} />}
                          </div>
                        })}
                      </div>

                    </div>
                  </>
                  }
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default CaseStudyContainer;
