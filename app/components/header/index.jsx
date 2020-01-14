import React from 'react';
import { Menu, Dropdown, Button, Icon } from 'antd';
import ConstDefines from '../../models/const-defines';

import './style/index.less';
import intl from 'react-intl-universal';
const SUPPOER_LOCALES = [
    {
        name: "English",
        value: "en-GB"     //英语(英国) [en-GB]
    },
    {
        name: "简体中文",
        value: "zh-CN"    //中文(简体) [zh-CN]
    },
    {
        name: "繁體中文",
        value: "zh-TW"    //中文(繁体，台湾) [zh-TW]
    },
    {
        name: "日本の",
        value: "ja-JP"    //日语(日本) [ja-JP]
    },
    {
        name: "한국어",
        value: "ko-KR"    //朝鲜语(韩国) [ko-KR]
    }
  ];
class Header extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            mediaQuery: false,
            collapse: true,
            reload:false
        };

        let selectedKey = this.props.currentKey;

        this.selectedKeys = [];
        if (selectedKey) {
            this.selectedKeys = [selectedKey];
        }
    }

    onMediaQuery() {
        let clientWidth = document.documentElement.clientWidth;
        let currentMediaQuery = true;
        if (clientWidth <= ConstDefines.MediaQuery.xs) {
            currentMediaQuery = true
        } else if (clientWidth <= ConstDefines.MediaQuery.sm) {
            currentMediaQuery = true
        } else if (clientWidth <= ConstDefines.MediaQuery.md) {
            currentMediaQuery = true
        } else if (clientWidth <= ConstDefines.MediaQuery.lg) {
            currentMediaQuery = true
        } else if (clientWidth <= ConstDefines.MediaQuery.xl) {
            currentMediaQuery = false
        } else if (clientWidth <= ConstDefines.MediaQuery.xxl) {
            currentMediaQuery = false
        }

        if (this.state.mediaQuery !== currentMediaQuery) {
            this.setState({
                mediaQuery: currentMediaQuery
            })
        }
    }

    componentWillMount() {
        if (window.matchMedia) {
            const mediaQueryList = window.matchMedia('screen and (min-width: 992px)');
            this.setState({
                mediaQuery: !mediaQueryList.matches
            });

            mediaQueryList.addListener((mediaQueryListEvent) => {
                this.setState({
                    mediaQuery: !mediaQueryListEvent.matches,
                });
            })

        } else {
            window.addEventListener('resize', () => { this.onMediaQuery() });
            this.onMediaQuery();
        }
    }

    render() {
        let menuMode = 'horizontal', collapseStyle = '', toggleStyle = '';
        let padding = 114
        if (this.state.mediaQuery) {
            menuMode = 'inline';
            toggleStyle = 'flex';
            padding = 44;
            if (!this.state.collapse) {
                collapseStyle = this.props.className + '-collapseShow';
            }
        }
        return (
            <div className={this.props.className}>
                <div className='flex container'>
                    <a className={`${this.props.className}-brand`} href=""></a>
                    {
                        this.state.collapse ?
                            <div className={`${this.props.className}-toggle`}
                                onClick={(...args) => {this.onMenuCollapse(false, ...args)}}>
                                <Icon type='bars' style={{fontSize: '32px', color: '#fff'}}/>
                            </div>:
                            <div className={`${this.props.className}-toggle`}
                                onClick={(...args) => {this.onMenuCollapse(true, ...args)}}>
                                <Icon type='close' style={{fontSize: '32px', color: '#fff'}} />
                            </div>
                    }
                    <div className={`${this.props.className}-collapse ${collapseStyle}`}>
                        <Menu
                            mode={menuMode}
                            onClick={(...args) => { this.onMenuItemClick(...args) }}
                            onSelect={(...args) => { this.onMenuItemSelect(...args) }}
                            selectedKeys={this.selectedKeys.length <=0 ? [] : this.selectedKeys} >
                            {SUPPOER_LOCALES.map((item,index) => {
                              return  <Menu.Item className={select === item.value ? 'lang-selected': 'header-land' }  key={`lang-${index+1}`}>{item.name}</Menu.Item>
                            })}

                        </Menu>
                    </div>
                </div>
            </div>
        );
    }
    getViewLang (){
        let n=0;
        for(let i=0;i<SUPPOER_LOCALES.length;i++){
            if(SUPPOER_LOCALES[i].value === global.select){
                n=i;
                break;
            }
        }
        return SUPPOER_LOCALES[n].name;
    }

    onMenuCollapse(collapse) {
        this.setState({
            collapse: collapse,
        })
    }
    onMenuItemSelect(event) {
        // console.log('event: ', event);
        if("documents" === event.key){
            let reload = this.state.reload;
            this.setState({
                reload: !reload
            });
            return ;
        }

        this.selectedKeys = [event.key];
        // console.log('current: ', this.selectedKeys);
    }
    onMenuItemClick(event) {
        switch (event.key) {
            case 'lang-1': {
                let lang = SUPPOER_LOCALES[0].value;
                location.search = `?lang=${lang}`;
                break;
            }
            case 'lang-2': {
                let lang = SUPPOER_LOCALES[1].value;
                location.search = `?lang=${lang}`;
                break;
            }
            case 'lang-3': {
                let lang = SUPPOER_LOCALES[2].value;
                location.search = `?lang=${lang}`;
                break;
            }
            case 'lang-4': {
                let lang = SUPPOER_LOCALES[3].value;
                location.search = `?lang=${lang}`;
                break;
            }
            case 'lang-5': {
                let lang = SUPPOER_LOCALES[4].value;
                location.search = `?lang=${lang}`;
                break;
            }
            case 'lang-6': {
                let lang = SUPPOER_LOCALES[5].value;
                location.search = `?lang=${lang}`;
                break;
            }
            case 'lang-7': {
                let lang = SUPPOER_LOCALES[6].value;
                location.search = `?lang=${lang}`;
                break;
            }
        }
    }
}

Header.defaultProps = {
    className: 'header',
}

export default Header;
