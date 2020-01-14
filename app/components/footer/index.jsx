import React from 'react';

import './style/index.less';


class Footer extends React.Component {
    render() {
        return (
            <div className={this.props.className}>
                <div className='container' style={{width: '100%'}}>
                    <div className='content'>
                        <span>©2014-2019 Tower Of Time. All Rights Reserved.</span>



                    </div>
                </div>
            </div>
        );
    }
}

Footer.defaultProps = {
    className: 'footer',
}

export default Footer;
