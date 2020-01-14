import React from 'react';

import Header from '../../components/header';
import Footer from '../../components/footer';
import Clock from '../../components/clock';
import Try from '../../components/time-try'
import Section1 from '../../components/time-item';
import Section2 from '../../components/time-api';
import Section3 from '../../components/time-qr';
import intl from 'react-intl-universal';


import './style/index.less';

import icon1 from './image/1.png';
import title1 from './image/title1.png';
import icon2 from './image/2.png';
import title2 from './image/title2.png';
import icon3 from './image/3.png';
import title3 from './image/title3.png';
import icon4 from './image/4.png';
import title4 from './image/title4.png';
import icon5 from './image/5.png';
import title5 from './image/title5.png';

class TimeTower extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state={
          str :''
        }
    }
    handleArrChage(str){
      this.setState({
        str:str
      })
    }
    componentWillMount() {
        window.scrollTo(0, 0);
    }
    render() {
      const list =[
        {
          'icon':icon1,
          'text':intl.get('TIME_TEXT'),
          'title':title1,
          'bgc':'#151524',
          'info':intl.get('TIME_INFORMATION1'),
          'info1':intl.get('TIME_INFORMATION2')
        },{
          'icon':icon2,
          'text':intl.get('RANDOM_TEXT'),
          'title':title2,
          'bgc':'#041620',
          'info':intl.get('RANDOM_INFORMATION1'),
          'info1':intl.get('RANDOM_INFORMATION2')
        },{
          'icon':icon3,
          'text':intl.get('QRNG_TEXT'),
          'title':title3,
          'info':intl.get('QRNG_INFORMATION1'),
          'info1':intl.get('QRNG_INFORMATION2')
        },{
          'icon':icon4,
          'text':intl.get('WHY_TEXT'),
          'title':title4,
          'bgc':'#041620',
          'info':intl.get('WHY_INFORMATION1'),
          'info1':''
        },{
          'icon':icon5,
          'text':intl.get('FREE_TEXT'),
          'title':title5,
          'bgc':'#111111',
          'info':intl.get('FREE_INFORMATION1'),
          'info1':intl.get('FREE_INFORMATION2')
        },{
          'icon':icon5,
          'title':title5,
          'bgc':'#111111',
          'info':intl.get('API_INFORMATION1'),
          'info1':intl.get('API_INFORMATION2')
        }
      ]
        const hashStr = this.state.str
        return (
            <div className={this.props.className}>
                <Header history={this.props.history} />
                <Clock changeArr ={this.handleArrChage.bind(this)} />
                <Try  hashStr = {hashStr}/>
                <Section1 list={list[0]} history={this.props.history}/>
                <Section1 list={list[1]} history={this.props.history}/>
                <Section3 list={list[2]} history={this.props.history}/>
                <Section1 list={list[3]} history={this.props.history}/>
                <Section1 list={list[4]} history={this.props.history}/>
                <Section2 list={list[5]} history={this.props.history}/>
                <Footer />
            </div>
        );
    }
}

TimeTower.defaultProps = {
    className: 'home-tower',
}

export default TimeTower;
