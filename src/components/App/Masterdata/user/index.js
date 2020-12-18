import React,{Component} from 'react';
import Layout from "../../../Layout";
import connect from "react-redux/es/connect/connect";
// import {FetchUsers} from "redux/actions/masterdata/user/users.action";
// import ListUsers from "./users/list";
// import {FetchUserLevel} from "redux/actions/masterdata/user/user_level.action";
// import { HEADERS } from '../../../../redux/actions/_constants';
// import ListUserLevel from "./user_level/list";
import jQuery from 'jquery';
// import ReactDOM from 'react-dom'
// let items = [];
class Product extends Component{
    constructor(props){
        super(props);
        this.state = {
            token:'',
            activeTab : 0,
            selectedIndex : 0,
        };
        this.trigger_click = this.trigger_click.bind(this)
        // this.getOffsetLeft = React.createRef();
    }
    componentWillReceiveProps = (nextProps) => {
        if (nextProps.auth.user) {
            // let access = nextProps.auth.user.access;
            // if(access!==undefined&&access!==null){
            //     if(nextProps.auth.user.access[10]['label']==="0"){
            //         alert("bukan halaman kamu");
            //         this.props.history.push({
            //             pathname: '/',
            //             state: {from: this.props.location.pathname}
            //         });
            //     }
            // }
        }
    }
    componentWillMount(){
        // let anyUsers = localStorage.getItem("any_users");
        // let pageUsers = localStorage.getItem("page_users");

        // let anyUserLevel = localStorage.getItem("any_user_level");
        // let pageUserLevel = localStorage.getItem("page_user_level");
        // this.props.dispatch(FetchUsers(pageUsers?pageUsers:1,anyUsers?anyUsers:''));
        // this.props.dispatch(FetchUserLevel(pageUserLevel?pageUserLevel:1,anyUserLevel?anyUserLevel:''));
    }
    //Use arrow functions to avoid binding
    handleSelect = (index) => {
        this.setState({selectedIndex: index}, () => {
        });
    };


    trigger_click(target,parent_id, obj, me){
        // console.log("-=-=-=-=-=-=-=-=-=-=-",obj.target)
            let flag=false;
            jQuery('.binary-genealogy-tree').each(function(){
                if(flag){
                jQuery(this).remove();
                }
                if(jQuery.contains(this, target)){
                //delete all others
                flag = true;
                }
            });
            //create the user which are fade in
    
            jQuery(obj).parent().parent().parent().parent().parent().parent().parent().find('.last_level_user').each(function(){
                jQuery(this).parent().fadeIn();
    
            });
            jQuery('.last_level_user').each(function(){
                jQuery(this).parent().removeClass('vertical_line');
    
            });
            jQuery('#vl-'+parent_id).addClass('vertical_line');
    
    
            if(parent_id.length){
            // jQuery.ajax({
                // url : Drupal.settings.ajaxurl+'/'+ parent_id,
                // 'type' : 'GET',
                // 'async' : false,
                // 'success' : function(response){
                    
                const response = `<div class="binary-genealogy-tree binary_tree_extended">
                <div class="binary-genealogy-level-0 clearfix">
                <div class="no_padding parent-wrapper clearfix">
                <div class="node-centere-item binary-level-width-100">
                <div class="node-item-root">
                <div class="binary-node-single-item user-block user-0"><div class="images_wrapper"><img class="profile-rounded-image-small" style="border-color: #ccc;" src="https://binary.epixelmlmsoftware.com/sites/binary/files/styles/genealogy-view/public/user-profile-images/business-man-1.jpg?itok=zhxmnAkU" width="70" height="70" alt="mlm.member" title="mlm.member"></div>
                <span class="wrap_content ">mlm.member</span>
                <div class="pop-up-content">
                <div class="profile_tooltip_pick">
                <div class="image_tooltip"><img class="profile-rounded-image-tooltip" src="https://binary.epixelmlmsoftware.com/sites/binary/files/styles/genealogy-view/public/user-profile-images/business-man-1.jpg?itok=zhxmnAkU" width="70" height="70" alt="mlm.member" title="mlm.member"></div>
                <div class="full-name">John Joseph </div>
                <div class="username">
                <span class="text-label">Username : </span>
                <span class="text-value">mlm.member</span>
                </div>
                </div>
                <div class="tooltip_profile_detaile">
                <div class="text">
                <span class="text-label">Sales (Left)</span>
                <span class="text-value">$0.00</span>
                </div>
                <div class="text">
                <span class="text-label">Sales (Right)</span>
                <span class="text-value">$0.00</span>
                </div>
                <div class="text">
                <span class="text-label">Carry-forward (Right)</span>
                <span class="text-value">$0.00</span>
                </div>
                <div class="text">
                <span class="text-label">Carry-forward (Left)</span>
                <span class="text-value">$1,300.00</span>
                </div>
                </div>
                <div class="tooltip-footer">
                <div class="text">
                <span class="text-label">Joined Date : </span>
                <span class="text-value">2019-04-01 08:30:00</span>
                </div>
                </div>
                </div></div>
                </div>
                <div class="parent-wrapper clearfix">
                <div class="node-left-item binary-level-width-50"> <span class="binary-hr-line binar-hr-line-left binary-hr-line-width-25"></span>
                <div class="node-item-1-child-left  node-item-root">
                <div class="binary-node-single-item user-block user-1"><div class="images_wrapper"><img class="profile-rounded-image-small" style="border-color: #ccc;" src="https://binary.epixelmlmsoftware.com/sites/binary/files/styles/genealogy-view/public/user-profile-images/formal-fashion-for-him.png?itok=-ACf3Iae" width="70" height="70" alt="walkerrobles" title="walkerrobles"></div>
                <span class="wrap_content ">walkerrobles</span>
                <div class="pop-up-content">
                <div class="profile_tooltip_pick">
                <div class="image_tooltip"><img class="profile-rounded-image-tooltip" src="https://binary.epixelmlmsoftware.com/sites/binary/files/styles/genealogy-view/public/user-profile-images/formal-fashion-for-him.png?itok=-ACf3Iae" width="70" height="70" alt="walkerrobles" title="walkerrobles"></div>
                <div class="full-name">Walker Robles</div>
                <div class="username">
                <span class="text-label">Username : </span>
                <span class="text-value">walkerrobles</span>
                </div>
                </div>
                <div class="tooltip_profile_detaile">
                <div class="text">
                <span class="text-label">Sales (Left)</span>
                <span class="text-value">$0.00</span>
                </div>
                <div class="text">
                <span class="text-label">Sales (Right)</span>
                <span class="text-value">$0.00</span>
                </div>
                <div class="text">
                <span class="text-label">Carry-forward (Right)</span>
                <span class="text-value">$0.00</span>
                </div>
                <div class="text">
                <span class="text-label">Carry-forward (Left)</span>
                <span class="text-value">$200.00</span>
                </div>
                </div>
                <div class="tooltip-footer">
                <div class="text">
                <span class="text-label">Joined Date : </span>
                <span class="text-value">2019-04-22 08:30:00</span>
                </div>
                </div>
                </div> </div>
                </div>
                <div class="parent-wrapper clearfix">
                <div class="node-left-item binary-level-width-25"> <span class="binary-hr-line binar-hr-line-left binary-hr-line-width-12"></span>
                <div class="node-item-2-child-left node-item-root">
                <div class="binary-node-single-item user-block user-3"><div class="images_wrapper"><img class="profile-rounded-image-small" style="border-color: #ccc;" src="https://binary.epixelmlmsoftware.com/sites/binary/files/styles/genealogy-view/public/user-profile-images/22406366.png?itok=St1a7F3z" width="70" height="70" alt="brendanmccarty" title="brendanmccarty"></div>
                <span class="wrap_content ">brendanmccarty</span>
                <div class="pop-up-content">
                <div class="profile_tooltip_pick">
                <div class="image_tooltip"><img class="profile-rounded-image-tooltip" src="https://binary.epixelmlmsoftware.com/sites/binary/files/styles/genealogy-view/public/user-profile-images/22406366.png?itok=St1a7F3z" width="70" height="70" alt="brendanmccarty" title="brendanmccarty"></div>
                <div class="full-name">Brendan Mccarty</div>
                <div class="username">
                <span class="text-label">Username : </span>
                <span class="text-value">brendanmccarty</span>
                </div>
                </div>
                <div class="tooltip_profile_detaile">
                <div class="text">
                <span class="text-label">Sales (Left)</span>
                <span class="text-value">$0.00</span>
                </div>
                <div class="text">
                <span class="text-label">Sales (Right)</span>
                <span class="text-value">$0.00</span>
                </div>
                <div class="text">
                <span class="text-label">Carry-forward (Right)</span>
                <span class="text-value">$500.00</span>
                </div>
                <div class="text">
                <span class="text-label">Carry-forward (Left)</span>
                <span class="text-value">$0.00</span>
                </div>
                </div>
                <div class="tooltip-footer">
                <div class="text">
                <span class="text-label">Joined Date : </span>
                <span class="text-value">2019-06-05 08:30:00</span>
                </div>
                </div>
                </div></div>
                </div>
                <div class="parent-wrapper clearfix">
                <div class="node-left-item binary-level-width-50"> <span class="binary-hr-line binar-hr-line-left binary-hr-line-width-25"></span>
                <div class="node-item-1-child-left">
                <div class="binary-node-single-item user-block user-7"><div class="images_wrapper"><img class="profile-rounded-image-small" style="border-color: #ccc;" src="https://binary.epixelmlmsoftware.com/sites/binary/files/styles/genealogy-view/public/user-profile-images/20190617_men_mobile.jpg?itok=sRysVX0B" width="70" height="70" alt="rhonawashington" title="rhonawashington"></div>
                <span class="wrap_content ">rhonawashington</span>
                <div class="pop-up-content">
                <div class="profile_tooltip_pick">
                <div class="image_tooltip"><img class="profile-rounded-image-tooltip" src="https://binary.epixelmlmsoftware.com/sites/binary/files/styles/genealogy-view/public/user-profile-images/20190617_men_mobile.jpg?itok=sRysVX0B" width="70" height="70" alt="rhonawashington" title="rhonawashington"></div>
                <div class="full-name">Rhona Washington</div>
                <div class="username">
                <span class="text-label">Username : </span>
                <span class="text-value">rhonawashington</span>
                </div>
                </div>
                <div class="tooltip_profile_detaile">
                <div class="text">
                <span class="text-label">Sales (Left)</span>
                <span class="text-value">$0.00</span>
                </div>
                <div class="text">
                <span class="text-label">Sales (Right)</span>
                <span class="text-value">$0.00</span>
                </div>
                <div class="text">
                <span class="text-label">Carry-forward (Right)</span>
                <span class="text-value">$0.00</span>
                </div>
                <div class="text">
                <span class="text-label">Carry-forward (Left)</span>
                <span class="text-value">$100.00</span>
                </div>
                </div>
                <div class="tooltip-footer">
                <div class="text">
                <span class="text-label">Joined Date : </span>
                <span class="text-value">2019-07-24 08:30:00</span>
                </div>
                </div>
                </div></div>
                <div class="last_level_user" onclick="if (!window.__cfRLUnblockHandlers) return false; trigger_click(event.target,'25',this)"><i class="fa fa-plus-circle fa-2x"></i></div>
                </div>
                </div>
                <div class="node-right-item binary-level-width-50"> <span class="binary-hr-line binar-hr-line-right binary-hr-line-width-25"></span>
                <div class="node-item-1-child-right">
                <div class="binary-node-single-item user-block user-8"><div class="images_wrapper"><img class="profile-rounded-image-small" style="border-color: #ccc;" src="https://binary.epixelmlmsoftware.com/sites/binary/files/styles/genealogy-view/public/user-profile-images/jason-emery-fltc-066-4-800x440.jpg?itok=4uKiveQY" width="70" height="70" alt="biancahawkins" title="biancahawkins"></div>
                <span class="wrap_content ">biancahawkins</span>
                <div class="pop-up-content">
                <div class="profile_tooltip_pick">
                <div class="image_tooltip"><img class="profile-rounded-image-tooltip" src="https://binary.epixelmlmsoftware.com/sites/binary/files/styles/genealogy-view/public/user-profile-images/jason-emery-fltc-066-4-800x440.jpg?itok=4uKiveQY" width="70" height="70" alt="biancahawkins" title="biancahawkins"></div>
                <div class="full-name">Bianca Hawkins</div>
                <div class="username">
                <span class="text-label">Username : </span>
                <span class="text-value">biancahawkins</span>
                </div>
                </div>
                <div class="tooltip_profile_detaile">
                <div class="text">
                <span class="text-label">Sales (Left)</span>
                <span class="text-value">$0.00</span>
                </div>
                <div class="text">
                <span class="text-label">Sales (Right)</span>
                <span class="text-value">$0.00</span>
                </div>
                <div class="text">
                <span class="text-label">Carry-forward (Right)</span>
                <span class="text-value">$400.00</span>
                </div>
                <div class="text">
                <span class="text-label">Carry-forward (Left)</span>
                <span class="text-value">$0.00</span>
                </div>
                </div>
                <div class="tooltip-footer">
                <div class="text">
                <span class="text-label">Joined Date : </span>
                <span class="text-value">2019-07-24 08:30:00</span>
                </div>
                </div>
                </div></div>
                <div class="last_level_user" onclick="if (!window.__cfRLUnblockHandlers) return false; trigger_click(event.target,'32',this)"><i class="fa fa-plus-circle fa-2x"></i></div>
                </div>
                </div>
                </div>
                </div>
                <div class="node-right-item binary-level-width-25"> <span class="binary-hr-line binar-hr-line-right binary-hr-line-width-12"></span>
                <div class="node-item-2-child-right node-item-root">
                <div class="binary-node-single-item user-block user-4"><div class="images_wrapper"><img class="profile-rounded-image-small" style="border-color: #ccc;" src="https://binary.epixelmlmsoftware.com/sites/binary/files/styles/genealogy-view/public/user-profile-images/career.jpg?itok=05qVQerN" width="70" height="70" alt="curranguzman" title="curranguzman"></div>
                <span class="wrap_content ">curranguzman</span>
                <div class="pop-up-content">
                <div class="profile_tooltip_pick">
                <div class="image_tooltip"><img class="profile-rounded-image-tooltip" src="https://binary.epixelmlmsoftware.com/sites/binary/files/styles/genealogy-view/public/user-profile-images/career.jpg?itok=05qVQerN" width="70" height="70" alt="curranguzman" title="curranguzman"></div>
                <div class="full-name">Curran Guzman</div>
                <div class="username">
                <span class="text-label">Username : </span>
                <span class="text-value">curranguzman</span>
                </div>
                </div>
                <div class="tooltip_profile_detaile">
                <div class="text">
                <span class="text-label">Sales (Left)</span>
                <span class="text-value">$0.00</span>
                </div>
                <div class="text">
                <span class="text-label">Sales (Right)</span>
                <span class="text-value">$0.00</span>
                </div>
                <div class="text">
                <span class="text-label">Carry-forward (Right)</span>
                <span class="text-value">$0.00</span>
                </div>
                <div class="text">
                <span class="text-label">Carry-forward (Left)</span>
                <span class="text-value">$200.00</span>
                </div>
                </div>
                <div class="tooltip-footer">
                <div class="text">
                <span class="text-label">Joined Date : </span>
                <span class="text-value">2019-06-19 08:30:00</span>
                </div>
                </div>
                </div></div>
                </div>
                <div class="parent-wrapper clearfix">
                <div class="node-left-item binary-level-width-50"> <span class="binary-hr-line binar-hr-line-left binary-hr-line-width-25"></span>
                <div class="node-item-1-child-left">
                <div class="binary-node-single-item user-block user-9"><div class="images_wrapper"><img class="profile-rounded-image-small" style="border-color: #ccc;" src="https://binary.epixelmlmsoftware.com/sites/binary/files/styles/genealogy-view/public/user-profile-images/images.squarespace-cdn.com_.jpeg?itok=g3iGxMQU" width="70" height="70" alt="rinaoliver" title="rinaoliver"></div>
                <span class="wrap_content ">rinaoliver</span>
                <div class="pop-up-content">
                <div class="profile_tooltip_pick">
                <div class="image_tooltip"><img class="profile-rounded-image-tooltip" src="https://binary.epixelmlmsoftware.com/sites/binary/files/styles/genealogy-view/public/user-profile-images/images.squarespace-cdn.com_.jpeg?itok=g3iGxMQU" width="70" height="70" alt="rinaoliver" title="rinaoliver"></div>
                <div class="full-name">Rina Oliver</div>
                <div class="username">
                <span class="text-label">Username : </span>
                <span class="text-value">rinaoliver</span>
                </div>
                </div>
                <div class="tooltip_profile_detaile">
                <div class="text">
                <span class="text-label">Sales (Left)</span>
                <span class="text-value">$0.00</span>
                </div>
                <div class="text">
                <span class="text-label">Sales (Right)</span>
                <span class="text-value">$0.00</span>
                </div>
                <div class="text">
                <span class="text-label">Carry-forward (Right)</span>
                <span class="text-value">$0.00</span>
                </div>
                <div class="text">
                <span class="text-label">Carry-forward (Left)</span>
                <span class="text-value">$0.00</span>
                </div>
                </div>
                <div class="tooltip-footer">
                <div class="text">
                <span class="text-label">Joined Date : </span>
                <span class="text-value">2019-07-24 08:30:00</span>
                </div>
                </div>
                </div></div>
                <div class="last_level_user" onclick="if (!window.__cfRLUnblockHandlers) return false; trigger_click(event.target,'33',this)"><i class="fa fa-plus-circle fa-2x"></i></div>
                 </div>
                </div>
                <div class="node-right-item binary-level-width-50"> <span class="binary-hr-line binar-hr-line-right binary-hr-line-width-25"></span>
                <div class="node-item-1-child-right">
                <div class="binary-node-single-item user-block user-10"><div class="images_wrapper"><img class="profile-rounded-image-small" style="border-color: #ccc;" src="https://binary.epixelmlmsoftware.com/sites/binary/files/styles/genealogy-view/public/genealogy-img/common.png?itok=TpmAMsZE" width="70" height="70" alt="forrestnoel" title="forrestnoel"></div>
                <span class="wrap_content ">forrestnoel</span>
                <div class="pop-up-content">
                <div class="profile_tooltip_pick">
                <div class="image_tooltip"><img class="profile-rounded-image-tooltip" src="https://binary.epixelmlmsoftware.com/sites/binary/files/styles/genealogy-view/public/genealogy-img/common.png?itok=TpmAMsZE" width="70" height="70" alt="forrestnoel" title="forrestnoel"></div>
                <div class="full-name">Forrest Noel</div>
                <div class="username">
                <span class="text-label">Username : </span>
                <span class="text-value">forrestnoel</span>
                </div>
                </div>
                <div class="tooltip_profile_detaile">
                <div class="text">
                <span class="text-label">Sales (Left)</span>
                <span class="text-value">$0.00</span>
                </div>
                <div class="text">
                <span class="text-label">Sales (Right)</span>
                <span class="text-value">$0.00</span>
                </div>
                <div class="text">
                <span class="text-label">Carry-forward (Right)</span>
                <span class="text-value">$0.00</span>
                </div>
                <div class="text">
                <span class="text-label">Carry-forward (Left)</span>
                <span class="text-value">$0.00</span>
                </div>
                </div>
                <div class="tooltip-footer">
                <div class="text">
                <span class="text-label">Joined Date : </span>
                <span class="text-value">2019-07-24 08:30:00</span>
                </div>
                </div>
                </div></div>
                <div class="last_level_user" onclick="if (!window.__cfRLUnblockHandlers) return false; trigger_click(event.target,'34',this)"><i class="fa fa-plus-circle fa-2x"></i></div>
                </div>
                </div>
                </div>
                </div>
                </div>
                </div>
                <div class="node-right-item binary-level-width-50"> <span class="binary-hr-line binar-hr-line-right binary-hr-line-width-25"></span>
                <div class="node-item-1-child-right   node-item-root">
                <div class="binary-node-single-item user-block user-2"><div class="images_wrapper"><img class="profile-rounded-image-small" style="border-color: #ccc;" src="https://binary.epixelmlmsoftware.com/sites/binary/files/styles/genealogy-view/public/user-profile-images/adult_close_up_eyeglasses_eyewear_face_facial_expression_fashion_fashion_model-1000789.jpg%21d.jpeg?itok=xXjvyVus" width="70" height="70" alt="karlynolan" title="karlynolan"></div>
                <span class="wrap_content ">karlynolan</span>
                <div class="pop-up-content right_tooltip">
                <div class="profile_tooltip_pick">
                <div class="image_tooltip"><img class="profile-rounded-image-tooltip" src="https://binary.epixelmlmsoftware.com/sites/binary/files/styles/genealogy-view/public/user-profile-images/adult_close_up_eyeglasses_eyewear_face_facial_expression_fashion_fashion_model-1000789.jpg%21d.jpeg?itok=xXjvyVus" width="70" height="70" alt="karlynolan" title="karlynolan"></div>
                <div class="full-name">Karly Nolan</div>
                <div class="username">
                <span class="text-label">Username : </span>
                <span class="text-value">karlynolan</span>
                </div>
                </div>
                <div class="tooltip_profile_detaile">
                <div class="text">
                <span class="text-label">Sales (Left)</span>
                <span class="text-value">$0.00</span>
                </div>
                <div class="text">
                <span class="text-label">Sales (Right)</span>
                <span class="text-value">$0.00</span>
                </div>
                <div class="text">
                <span class="text-label">Carry-forward (Right)</span>
                <span class="text-value">$200.00</span>
                </div>
                <div class="text">
                <span class="text-label">Carry-forward (Left)</span>
                <span class="text-value">$0.00</span>
                </div>
                </div>
                <div class="tooltip-footer">
                <div class="text">
                <span class="text-label">Joined Date : </span>
                <span class="text-value">2019-05-16 08:30:00</span>
                </div>
                </div>
                </div></div>
                </div>
                <div class="parent-wrapper clearfix">
                <div class="node-left-item binary-level-width-25"> <span class="binary-hr-line binar-hr-line-left binary-hr-line-width-12"></span>
                <div class="node-item-2-child-left node-item-root">
                <div class="binary-node-single-item user-block user-5"><div class="images_wrapper"><img class="profile-rounded-image-small" style="border-color: #ccc;" src="https://binary.epixelmlmsoftware.com/sites/binary/files/styles/genealogy-view/public/user-profile-images/suit-for-a-civil-ceremony.jpg?itok=HsJLhfCa" width="70" height="70" alt="mechellelong" title="mechellelong"></div>
                <span class="wrap_content ">mechellelong</span>
                <div class="pop-up-content right_tooltip">
                <div class="profile_tooltip_pick">
                <div class="image_tooltip"><img class="profile-rounded-image-tooltip" src="https://binary.epixelmlmsoftware.com/sites/binary/files/styles/genealogy-view/public/user-profile-images/suit-for-a-civil-ceremony.jpg?itok=HsJLhfCa" width="70" height="70" alt="mechellelong" title="mechellelong"></div>
                <div class="full-name">Mechelle Long</div>
                <div class="username">
                <span class="text-label">Username : </span>
                <span class="text-value">mechellelong</span>
                </div>
                </div>
                <div class="tooltip_profile_detaile">
                <div class="text">
                <span class="text-label">Sales (Left)</span>
                <span class="text-value">$0.00</span>
                </div>
                <div class="text">
                <span class="text-label">Sales (Right)</span>
                <span class="text-value">$0.00</span>
                </div>
                <div class="text">
                <span class="text-label">Carry-forward (Right)</span>
                <span class="text-value">$200.00</span>
                </div>
                <div class="text">
                <span class="text-label">Carry-forward (Left)</span>
                <span class="text-value">$0.00</span>
                </div>
                </div>
                <div class="tooltip-footer">
                <div class="text">
                <span class="text-label">Joined Date : </span>
                <span class="text-value">2019-07-04 08:30:00</span>
                </div>
                </div>
                </div></div>
                </div>
                <div class="parent-wrapper clearfix">
                <div class="node-left-item binary-level-width-50"> <span class="binary-hr-line binar-hr-line-left binary-hr-line-width-25"></span>
                <div class="node-item-1-child-left">
                <div class="binary-node-single-item user-block user-11"><div class="images_wrapper"><a href="/afl/ref/17/12/LEFT/add/new-ref?u=eyJzcG9uc29yIjoiMTIiLCJwYXJlbnQiOiIxNyIsInBvc2l0aW9uIjoiTEVGVCIsInJldHVybl9wYXRoIjoiYWZsXC9nZW5lYWxvZ3ktdHJlZSJ9"><img class="profile-rounded-image-small" src="https://binary.epixelmlmsoftware.com/sites/binary/files/styles/genealogy-view/public/genealogy-img/no-user.png?itok=jHw_hHUZ" width="70" height="70" alt="Add new member" title="Add new member"></a></div><span class="wrap_content"><a href="/afl/ref/17/12/LEFT/add/new-ref?u=eyJzcG9uc29yIjoiMTIiLCJwYXJlbnQiOiIxNyIsInBvc2l0aW9uIjoiTEVGVCIsInJldHVybl9wYXRoIjoiYWZsXC9nZW5lYWxvZ3ktdHJlZSJ9">Add new member</a></span></div>
                <div class="last_level_user"><i class="fa fa-2x">&nbsp;</i></div>
                </div>
                </div>
                <div class="node-right-item binary-level-width-50"> <span class="binary-hr-line binar-hr-line-right binary-hr-line-width-25"></span>
                <div class="node-item-1-child-right">
                <div class="binary-node-single-item user-block user-12"><div class="images_wrapper"><img class="profile-rounded-image-small" style="border-color: #ccc;" src="https://binary.epixelmlmsoftware.com/sites/binary/files/styles/genealogy-view/public/genealogy-img/common.png?itok=TpmAMsZE" width="70" height="70" alt="dexaxe" title="dexaxe"></div>
                <span class="wrap_content ">dexaxe</span>
                <div class="pop-up-content right_tooltip">
                <div class="profile_tooltip_pick">
                <div class="image_tooltip"><img class="profile-rounded-image-tooltip" src="https://binary.epixelmlmsoftware.com/sites/binary/files/styles/genealogy-view/public/genealogy-img/common.png?itok=TpmAMsZE" width="70" height="70" alt="dexaxe" title="dexaxe"></div>
                <div class="full-name">Brenna Hopper</div>
                <div class="username">
                <span class="text-label">Username : </span>
                <span class="text-value">dexaxe</span>
                </div>
                </div>
                <div class="tooltip_profile_detaile">
                <div class="text">
                <span class="text-label">Sales (Left)</span>
                <span class="text-value">$0.00</span>
                </div>
                <div class="text">
                <span class="text-label">Sales (Right)</span>
                <span class="text-value">$0.00</span>
                </div>
                <div class="text">
                <span class="text-label">Carry-forward (Right)</span>
                <span class="text-value">$0.00</span>
                </div>
                <div class="text">
                <span class="text-label">Carry-forward (Left)</span>
                <span class="text-value">$0.00</span>
                </div>
                </div>
                <div class="tooltip-footer">
                <div class="text">
                <span class="text-label">Joined Date : </span>
                <span class="text-value">2019-07-24 08:30:00</span>
                </div>
                </div>
                </div></div>
                <div class="last_level_user" onclick="if (!window.__cfRLUnblockHandlers) return false; trigger_click(event.target,'42',this)"><i class="fa fa-plus-circle fa-2x"></i></div>
                </div>
                </div>
                </div>
                </div>
                <div class="node-right-item binary-level-width-25"> <span class="binary-hr-line binar-hr-line-right binary-hr-line-width-12"></span>
                <div class="node-item-2-child-right node-item-root">
                <div class="binary-node-single-item user-block user-6"><div class="images_wrapper"><img class="profile-rounded-image-small" style="border-color: #ccc;" src="https://binary.epixelmlmsoftware.com/sites/binary/files/styles/genealogy-view/public/user-profile-images/istockphoto-915981818-170667a.jpg?itok=a7_KMroU" width="70" height="70" alt="tallulahbarber" title="tallulahbarber"></div>
                <span class="wrap_content ">tallulahbarber</span>
                <div class="pop-up-content right_tooltip">
                <div class="profile_tooltip_pick">
                <div class="image_tooltip"><img class="profile-rounded-image-tooltip" src="https://binary.epixelmlmsoftware.com/sites/binary/files/styles/genealogy-view/public/user-profile-images/istockphoto-915981818-170667a.jpg?itok=a7_KMroU" width="70" height="70" alt="tallulahbarber" title="tallulahbarber"></div>
                <div class="full-name">Tallulah Barber</div>
                <div class="username">
                <span class="text-label">Username : </span>
                <span class="text-value">tallulahbarber</span>
                </div>
                </div>
                <div class="tooltip_profile_detaile">
                <div class="text">
                <span class="text-label">Sales (Left)</span>
                <span class="text-value">$0.00</span>
                </div>
                <div class="text">
                <span class="text-label">Sales (Right)</span>
                <span class="text-value">$0.00</span>
                </div>
                <div class="text">
                <span class="text-label">Carry-forward (Right)</span>
                <span class="text-value">$300.00</span>
                </div>
                <div class="text">
                <span class="text-label">Carry-forward (Left)</span>
                <span class="text-value">$0.00</span>
                </div>
                </div>
                <div class="tooltip-footer">
                <div class="text">
                <span class="text-label">Joined Date : </span>
                <span class="text-value">2019-07-24 08:30:00</span>
                </div>
                </div>
                </div></div>
                </div>
                <div class="parent-wrapper clearfix">
                <div class="node-left-item binary-level-width-50"> <span class="binary-hr-line binar-hr-line-left binary-hr-line-width-25"></span>
                <div class="node-item-1-child-left">
                <div class="binary-node-single-item user-block user-13"><div class="images_wrapper"><a href="/afl/ref/18/12/LEFT/add/new-ref?u=eyJzcG9uc29yIjoiMTIiLCJwYXJlbnQiOiIxOCIsInBvc2l0aW9uIjoiTEVGVCIsInJldHVybl9wYXRoIjoiYWZsXC9nZW5lYWxvZ3ktdHJlZSJ9"><img class="profile-rounded-image-small" src="https://binary.epixelmlmsoftware.com/sites/binary/files/styles/genealogy-view/public/genealogy-img/no-user.png?itok=jHw_hHUZ" width="70" height="70" alt="Add new member" title="Add new member"></a></div><span class="wrap_content"><a href="/afl/ref/18/12/LEFT/add/new-ref?u=eyJzcG9uc29yIjoiMTIiLCJwYXJlbnQiOiIxOCIsInBvc2l0aW9uIjoiTEVGVCIsInJldHVybl9wYXRoIjoiYWZsXC9nZW5lYWxvZ3ktdHJlZSJ9">Add new member</a></span></div>
                <div class="last_level_user"><i class="fa fa-2x">&nbsp;</i></div>
                </div>
                </div>
                <div class="node-right-item binary-level-width-50"> <span class="binary-hr-line binar-hr-line-right binary-hr-line-width-25"></span>
                <div class="node-item-1-child-right">
                <div class="binary-node-single-item user-block user-14"><div class="images_wrapper"><img class="profile-rounded-image-small" style="border-color: #ccc;" src="https://binary.epixelmlmsoftware.com/sites/binary/files/styles/genealogy-view/public/genealogy-img/common.png?itok=TpmAMsZE" width="70" height="70" alt="hileca" title="hileca"></div>
                <span class="wrap_content ">hileca</span>
                <div class="pop-up-content right_tooltip">
                <div class="profile_tooltip_pick">
                <div class="image_tooltip"><img class="profile-rounded-image-tooltip" src="https://binary.epixelmlmsoftware.com/sites/binary/files/styles/genealogy-view/public/genealogy-img/common.png?itok=TpmAMsZE" width="70" height="70" alt="hileca" title="hileca"></div>
                <div class="full-name">Cade Padilla</div>
                <div class="username">
                <span class="text-label">Username : </span>
                <span class="text-value">hileca</span>
                </div>
                </div>
                <div class="tooltip_profile_detaile">
                <div class="text">
                <span class="text-label">Sales (Left)</span>
                <span class="text-value">$0.00</span>
                </div>
                <div class="text">
                <span class="text-label">Sales (Right)</span>
                <span class="text-value">$0.00</span>
                </div>
                <div class="text">
                <span class="text-label">Carry-forward (Right)</span>
                <span class="text-value">$0.00</span>
                </div>
                <div class="text">
                <span class="text-label">Carry-forward (Left)</span>
                <span class="text-value">$0.00</span>
                </div>
                </div>
                <div class="tooltip-footer">
                <div class="text">
                <span class="text-label">Joined Date : </span>
                <span class="text-value">2019-07-24 08:30:00</span>
                </div>
                </div>
                </div></div>
                <div class="last_level_usermt-4" onClick={(e)=>this.trigger_click(e.target,'42',e)}><i class="fa fa-plus-circle fa-2x"></i></div>
                </div>
                </div>
                </div>
                </div>
                </div>
                </div>
                </div>
                </div>
                </div>
                </div>
                </div>`;
                    jQuery('#block-system-main').append(response);
                    // let w= ReactDOM.findDOMNode(this.getOffsetLeft.current).getBoundingClientRect().left;
                    // let w= 1549+obj.target.offsetLeft;
                    let w= jQuery('#fa-2x-'+parent_id).offset().left;
                    // let w= 1630;
                    // console.log("obj",jQuery(obj.target).find('.fa-2x').prevObject[0].offsetLeft)
                    console.log("obj",obj)
                    // console.log("w",w)
                    console.log("jQuery(obj).find('.fa-2x')",jQuery(obj).find('.fa-2x').offset.left)
    
                    // var tte = ReactDOM.findDOMNode(this.getOffsetLeft.current).getBoundingClientRect()
                    // console.log("tedsdsdsd",tte.left)
                    // console.log("let offsetTop = this.someRefName.current.offsetTop;",this.getOffsetLeft.current.right)
                    let tt = jQuery('.binary-genealogy-tree').eq( jQuery('.binary-genealogy-tree').length -1).find('.binary-node-single-item').eq(0).offset().left;
                    // console.log("tt",tt)

                let class_div = ''
                let width = ''
                let css_style = ''
                let binary_tree_left = ''
                console.log("W",w)
                console.log("tt",tt)
                    if (w > tt) {
                        class_div = "binar-hr-line-left";
                        width = w - tt;
                        css_style = 'margin-right';
                        w = jQuery('.binary-genealogy-tree').eq(jQuery('.binary-genealogy-tree').length - 1).width() - (jQuery('#fa-2x-'+parent_id).offset().left - jQuery('.binary-genealogy-tree').eq(jQuery('.binary-genealogy-tree').length - 1).offset().left + jQuery('.fa-2x').width() / 2);
                        if (jQuery(obj).parent().parent().hasClass('node-right-item')) {
                            w += 2;
                        }
                        width -= jQuery('.binary-genealogy-tree').eq(jQuery('.binary-genealogy-tree').length - 1).find('.binary-node-single-item').eq(0).width() / 2;
                        console.log(w);
                    } else {
                        class_div = "binar-hr-line-right";
                        width = tt - w;
                        css_style = 'margin-left';
                        binary_tree_left = jQuery('.binary-genealogy-tree').eq(jQuery('.binary-genealogy-tree').length - 1).offset().left;
                        // w -= binary_tree_left - jQuery(obj).find('.fa-2x').width() / 2;
                        w -= binary_tree_left - 22 / 2;
                        if (jQuery(obj).parent().parent().hasClass('node-right-item')) {
                            w -= 2;
                        }
                        width += jQuery('.binary-genealogy-tree').eq(jQuery('.binary-genealogy-tree').length - 1).find('.binary-node-single-item').eq(0).width() / 2;
                    }
                    console.log("jQuery(obj).find('.fa-2x')",jQuery(obj).find('.fa-2x'))
                    console.log("w",w)
                    console.log("width",width)
                    jQuery('.binary-genealogy-tree').eq( jQuery('.binary-genealogy-tree').length -1).prepend('<span class="line_logic hr_class '+class_div+' "></span>');
                    //position set up
                    jQuery('.binary-genealogy-tree').eq( jQuery('.binary-genealogy-tree').length -1).find('.hr_class').css('width',(width)+'px');
                    //get the binary tre left
                    jQuery('.binary-genealogy-tree').eq( jQuery('.binary-genealogy-tree').length -1).find('.hr_class').css(css_style,w+'px');
                    jQuery('.binary-genealogy-tree').eq( jQuery('.binary-genealogy-tree').length -1).addClass('binary_tree_extended');
                    jQuery('html,body').animate({scrollTop : jQuery('.binary-genealogy-tree').eq( jQuery('.binary-genealogy-tree').length -1).offset().top},1000);
                    jQuery(obj).parent().fadeOut();
    
                    jQuery('.node-left-item,.node-right-item').each(function(){
                    let center = window.innerWidth/2;
                    let pos = jQuery(this).offset().left;
    
                    if(center < pos){
                            jQuery(this).find('.pop-up-content').eq(0).addClass('right_tooltip');
                            //style = "left:"+(0-($('.pop-up-content').eq(0).width()+50))+'px';
                    }
                    });
                    return false;
    
            //     }
    
            // });
        }
        return false;
    }
    
    // trigger_click(event, parent_id, obj) {
    //     console.log("event================",event)
    //     console.log("parent_id================",parent_id)
    //     console.log("obj================",obj)
    //     console.log("obj.parentElement================",obj.parentElement.parentElement.classList)
    //     const target = event.target;
    //     console.log("target================",target)
    //     console.log("this================",this)
    //     console.log("document.getElementsByTagName(*)================",document.getElementsByTagName("*"))
    //     let flag = true;
    //     let it = 0;
    //     [].forEach.call(document.querySelectorAll('.binary-genealogy-tree'), function () {
    //     // do whatever
    //     if (flag) {
    //         target.remove();
    //     } else {
    //         it++;
    //     }

    //     // if (document.getElementsByTagName("*").includes(target)) {
    //     //     //delete all others
    //     //     flag = true;
    //     // }
    //     });
    //     [].forEach.call(document.querySelectorAll('.last_level_user'), function (e) {
    //     // document.querySelector('.last_level_user').each(function () {
    //     //document.querySelector(this).previousElementSibling.fadeIn();
    //     console.log("eeeeeeeeeeeeeeeeeeeeeee",e)
    //     e.parentElement.classList.remove('vertical_line');
    //     });

    //     if (items[it - 1] && items[it - 1].length) {
    //     document.querySelector(obj).parentElement.parentElement.parentElement.parentElement.querySelector('.no-bdr').innerHTML = items[it - 1];
    //     document.querySelector(obj).parentElement.parentElement.parentElement.parentElement.querySelector('.no-bdr').classList.remove('no-bdr');
    //     items[it - 1] = '';
    //     }

    //     // document.querySelector.parentElement.parentElement.classList.add('vertical_line');
    //     document.querySelector('#testVL').classList.add('vertical_line');
    //     // let url_arr = window.location.href.split('?');
    //     // let get_params = '';

    //     // if (url_arr[1]) {
    //     // get_params = '?' + url_arr[1];
    //     // }

    //     if (parent_id.length && parent_id !== 'empty') {
    //     // fetch(HEADERS.URL + `site/logo`)
    //     // .then(res => res.json())
    //     // .then(
    //     //     (response) => {
    //     const response = `<div class="binary-genealogy-tree binary_tree_extended">
    //         <div class="binary-genealogy-level-0 clearfix">
    //         <div class="no_padding parent-wrapper clearfix">
    //         <div class="node-centere-item binary-level-width-100">
    //         <div class="node-item-root">
    //         <div class="binary-node-single-item user-block user-0"><div class="images_wrapper"><img class="profile-rounded-image-small" style="border-color: #ccc;" src="https://binary.epixelmlmsoftware.com/sites/binary/files/styles/genealogy-view/public/user-profile-images/images.squarespace-cdn.com_.jpeg?itok=g3iGxMQU" width="70" height="70" alt="rinaoliver" title="rinaoliver" /></div>
    //         <span class="wrap_content ">rinaoliver</span>
    //         <div class="pop-up-content">
    //         <div class="profile_tooltip_pick">
    //         <div class="image_tooltip"><img class="profile-rounded-image-tooltip" src="https://binary.epixelmlmsoftware.com/sites/binary/files/styles/genealogy-view/public/user-profile-images/images.squarespace-cdn.com_.jpeg?itok=g3iGxMQU" width="70" height="70" alt="rinaoliver" title="rinaoliver" /></div>
    //         <div class="full-name">Rina Oliver</div>
    //         <div class="username">
    //         <span class="text-label">Username : </span>
    //         <span class="text-value">rinaoliver</span>
    //         </div>
    //         </div>
    //         <div class="tooltip_profile_detaile">
    //         <div class="text">
    //         <span class="text-label">Sales (Left)</span>
    //         <span class="text-value">$0.00</span>
    //         </div>
    //         <div class="text">
    //         <span class="text-label">Sales (Right)</span>
    //         <span class="text-value">$0.00</span>
    //         </div>
    //         <div class="text">
    //         <span class="text-label">Carry-forward (Right)</span>
    //         <span class="text-value">$0.00</span>
    //         </div>
    //         <div class="text">
    //         <span class="text-label">Carry-forward (Left)</span>
    //         <span class="text-value">$0.00</span>
    //         </div>
    //         </div>
    //         <div class="tooltip-footer">
    //         <div class="text">
    //         <span class="text-label">Joined Date : </span>
    //         <span class="text-value">2019-07-24 08:30:00</span>
    //         </div>
    //         </div>
    //         </div></div>
    //         </div>
    //         <div class="scroll_class parent-wrapper clearfix">
    //         <div class="node-left-item binary-level-width-50"> <span class="binary-hr-line binar-hr-line-left binary-hr-line-width-25"></span>
    //         <div class="node-item-1-child-left  ">
    //         <div class="binary-node-single-item user-block user-1"><div class="images_wrapper"><a href="/afl/ref/33/12/LEFT/add/new-ref?u=eyJzcG9uc29yIjoiMTIiLCJwYXJlbnQiOiIzMyIsInBvc2l0aW9uIjoiTEVGVCIsInJldHVybl9wYXRoIjoiYWZsXC9nZW5lYWxvZ3ktZXhwYW5kLXZpZXdcLzMzIn0%3D"><img class="profile-rounded-image-small" src="https://binary.epixelmlmsoftware.com/sites/binary/files/styles/genealogy-view/public/genealogy-img/no-user.png?itok=jHw_hHUZ" width="70" height="70" alt="Add new member" title="Add new member" /></a></div><span class="wrap_content"><a href="/afl/ref/33/12/LEFT/add/new-ref?u=eyJzcG9uc29yIjoiMTIiLCJwYXJlbnQiOiIzMyIsInBvc2l0aW9uIjoiTEVGVCIsInJldHVybl9wYXRoIjoiYWZsXC9nZW5lYWxvZ3ktZXhwYW5kLXZpZXdcLzMzIn0%3D">Add new member</a></span> </div>
    //         </div>
    //         <div class="scroll_class parent-wrapper clearfix">
    //         </div>
    //         </div>
    //         <div class="node-right-item binary-level-width-50"> <span class="binary-hr-line binar-hr-line-right binary-hr-line-width-25"></span>
    //         <div class="node-item-1-child-right   ">
    //         <div class="binary-node-single-item user-block user-2"><div class="images_wrapper"><a href="/afl/ref/33/12/RIGHT/add/new-ref?u=eyJzcG9uc29yIjoiMTIiLCJwYXJlbnQiOiIzMyIsInBvc2l0aW9uIjoiUklHSFQiLCJyZXR1cm5fcGF0aCI6ImFmbFwvZ2VuZWFsb2d5LWV4cGFuZC12aWV3XC8zMyJ9"><img class="profile-rounded-image-small" src="https://binary.epixelmlmsoftware.com/sites/binary/files/styles/genealogy-view/public/genealogy-img/no-user.png?itok=jHw_hHUZ" width="70" height="70" alt="Add new member" title="Add new member" /></a></div><span class="wrap_content"><a href="/afl/ref/33/12/RIGHT/add/new-ref?u=eyJzcG9uc29yIjoiMTIiLCJwYXJlbnQiOiIzMyIsInBvc2l0aW9uIjoiUklHSFQiLCJyZXR1cm5fcGF0aCI6ImFmbFwvZ2VuZWFsb2d5LWV4cGFuZC12aWV3XC8zMyJ9">Add new member</a></span></div>
    //         </div>
    //         <div class="scroll_class parent-wrapper clearfix">
    //         </div>
    //         </div>
    //         </div>
    //         </div>
    //         </div>
    //         </div>
    //         </div>
    //         `;
    //             items[it - 1] =  document.querySelector('#testVL').innerHTML = "";

    //             if (document.querySelectorAll('.binary-genealogy-tree')[document.querySelectorAll('.binary-genealogy-tree').length - 1].querySelectorAll('.scroll_class').length) {
    //                 console.log("document.querySelectorAll('.binary-genealogy-tree').length",document.querySelectorAll('.binary-genealogy-tree').length)
    //                 console.log("document.querySelectorAll('.binary-genealogy-tree')[document.querySelectorAll('.binary-genealogy-tree').length - 1]').length",document.querySelectorAll('.binary-genealogy-tree')[document.querySelectorAll('.binary-genealogy-tree').length - 1])
    //                 document.querySelectorAll('.binary-genealogy-tree')[document.querySelectorAll('.binary-genealogy-tree').length - 1].querySelector('.scroll_class').style.paddingBottom = '64px';
    //             } else {
    //                 document.querySelectorAll('.binary-genealogy-tree')[document.querySelectorAll('.binary-genealogy-tree').length - 1].querySelectorAll('.node-centere-item').style.paddingBottom = '0px';
    //             }

    //             document.querySelector('#block-system-main').insertAdjacentHTML("beforeend", response);
    //             let w_max = 0;
    //             [].forEach.call(document.querySelectorAll('.binary-genealogy-tree'), function (ele) {
    //                 // document.querySelector('.binary-genealogy-tree').each(function () {
    //                     console.log("eleeeeeeeeeeeeee",ele)
    //                     console.log("document.querySelector('.last_level_user')",document.querySelector('.last_level_user'))
    //                 let max_w_ele = document.querySelector('.last_level_user').parentElement.parentElement.offsetWidth;
    //                 let n = document.querySelectorAll('.last_level_user').length;
    //                 let max_w = max_w_ele * n;

    //                 console.log("max_w_ele",max_w_ele)
    //                 if (w_max < max_w) {
    //                 w_max = max_w;
    //                 }
    //             });
    //             // let max_width = w_max;
    //             let w = obj.offsetLeft;

    //             let tt = '';
    //             if (document.querySelector('#block-system-main').offsetWidth > window.innerWidth) {
    //                 tt = document.querySelector('#block-system-main').offsetWidth / 2;
    //             } else {
    //                 tt = window.innerWidth / 2;
    //             }

    //             let width_offset = 0;

    //             if (document.querySelector('#block-system-main').offsetWidth > window.innerWidth) {
    //                 width_offset = 150;
    //             }

    //             let ot = 0;

    //             console.log("document.querySelectorAll('.ecaps-sidemenu-area').classList",document.querySelectorAll(".ecaps-sidemenu-area").classList)
    //             // if (document.querySelectorAll(".ecaps-sidemenu-area").classList.includes("app-aside-folded") || !document.querySelector("#aside").offsetWidth) {
    //                 // if (!document.querySelector(".ecaps-sidemenu-area").offsetWidth) {
    //                 // ot += 157;
    //                 // } else {
    //                 ot += 97;
    //                 // }

    //                 // if (document.querySelector('.scroll_class').offsetWidth > window.innerWidth) ot += 97;
    //             // }

    //             let class_div = ''
    //             let width = ''
    //             let css_style = ''
    //             // let w = ''
    //             let binary_tree_left = ''

    //             if (w - 90 - width_offset + ot > tt) {
    //                 class_div = "binar-hr-line-left";
    //                 width = w - tt - 75 - width_offset; // var ww = w;

    //                 css_style = 'margin-right';
    //                 binary_tree_left = document.querySelectorAll('.binary-genealogy-tree')[document.querySelectorAll('.binary-genealogy-tree').length - 1].offsetLeft;
    //                 w = document.querySelector('.binary-genealogy-tree').offsetWidth - w; //console.log("inside", w)

    //                 width += ot;
    //                 width -= 40;
    //                 w -= 1;
    //             } else {
    //                 class_div = "binar-hr-line-right";
    //                 width = tt - w + 65 + width_offset;
    //                 css_style = 'margin-left';
    //                 binary_tree_left = document.querySelectorAll('.binary-genealogy-tree')[document.querySelectorAll('.binary-genealogy-tree').length - 1].offsetLeft;
    //                 w -= binary_tree_left - 35;
    //                 width -= ot;
    //                 width += 50;
    //             }


    //             document.querySelectorAll('.binary-genealogy-tree')[document.querySelectorAll('.binary-genealogy-tree').length - 1].insertAdjacentHTML('afterbegin',('<span class="line_logic hr_class ' + class_div + ' "></span>')); //not process
    //             //position set up

    //             console.log("document.querySelectorAll('.binary-genealogy-tree')[document.querySelectorAll('.binary-genealogy-tree').length - 1].querySelector('.hr_class')",document.querySelectorAll('.binary-genealogy-tree')[document.querySelectorAll('.binary-genealogy-tree').length - 1])
    //             document.querySelectorAll('.binary-genealogy-tree')[document.querySelectorAll('.binary-genealogy-tree').length - 1].querySelector('.hr_class').style.width = width + 'px'; //get the binary tre left

    //             document.querySelectorAll('.binary-genealogy-tree')[document.querySelectorAll('.binary-genealogy-tree').length - 1].querySelector('.hr_class').style[css_style] = w + 'px';
    //             document.querySelectorAll('.binary-genealogy-tree')[document.querySelectorAll('.binary-genealogy-tree').length - 1].classList.add('binary_tree_extended');
    //             document.querySelectorAll('html,body').scrollTop = document.querySelectorAll('.binary-genealogy-tree')[document.querySelectorAll('.binary-genealogy-tree').length - 1].offsetTop;
    //             document.querySelectorAll('html,body').scrollLeft = tt;
    //             [].forEach.call(document.querySelectorAll('.node-left-item,.node-right-item'), function () {
    //                 // document.querySelector('.node-left-item,.node-right-item').each(function () {
    //                 let pos = target.offsetLeft;

    //                 if (tt < pos) {
    //                     target.querySelectorAll('.pop-up-content')[0].classList.add('right_tooltip'); //style = "left:"+(0-(document.querySelector('.pop-up-content').eq(0).width()+50))+'px';
    //                 }
    //             }); //Add new class for the first last element

    //             [].forEach.call(document.querySelectorAll('.binary-genealogy-tree')[document.querySelectorAll('.binary-genealogy-tree').length - 1].querySelector('.scroll_class'), function () {
    //                 // document.querySelectorAll('.binary-genealogy-tree')[(document.querySelector('.binary-genealogy-tree').length - 1)].querySelector('.scroll_class').each(function () {
    //                 let length = document.querySelector(target).querySelectorAll('.node-left-item').length;

    //                 if (length === 1) {
    //                 document.querySelector(target).querySelectorAll('.binar-hr-line-left')[0].classList.add('no-bg');
    //                 } else {
    //                 document.querySelector(target).querySelectorAll('.binar-hr-line-left')[0].classList.add('left_no_hr');
    //                 document.querySelector(target).querySelectorAll('.binar-hr-line-left')[length - 1].classList.add('right_no_hr');
    //                 }
    //             });
    //             // obj.parentElement.classList.add('no-bdr'); //if it is last level then add the last_class class

    //             if (!document.querySelectorAll('.binary-genealogy-tree')[document.querySelectorAll('.binary-genealogy-tree').length - 1].querySelectorAll('.scroll_class')[0].querySelectorAll('.node-left-item').length) document.querySelectorAll('.binary-genealogy-tree')[document.querySelectorAll('.binary-genealogy-tree').length - 1].querySelectorAll('.main-member').classList.add('last_class');
    //             document.querySelectorAll('.binary-genealogy-tree')[document.querySelectorAll('.binary-genealogy-tree').length - 1].querySelector('.images_wrapper').innerHTML = '&nbsp';
    //             // obj.parentElement.classList.remove('client');
    //             // obj.parentElement.classList.remove('networker');
    //             document.querySelectorAll('.binary-genealogy-tree')[document.querySelectorAll('.binary-genealogy-tree').length - 1].querySelector('.wrap_content').innerHTML = '&nbsp';
    //             document.querySelectorAll('.binary-genealogy-tree')[document.querySelectorAll('.binary-genealogy-tree').length - 1].querySelector('.wrap_content').classList.add('no-bg');
    //             obj.innerHTML = '&nbsp;';

    //             if (document.querySelectorAll('.binary-genealogy-tree')[document.querySelectorAll('.binary-genealogy-tree').length - 1].querySelectorAll('.scroll_class div').length) {
    //                 document.querySelectorAll('.binary-genealogy-tree')[document.querySelectorAll('.binary-genealogy-tree').length - 1].querySelector('.scroll_class').style.paddingBottom = '65px';
    //             } else {
    //                 document.querySelectorAll('.binary-genealogy-tree')[document.querySelectorAll('.binary-genealogy-tree').length - 1].querySelector('.node-centere-item').style.paddingBottom = '30px';
    //             }
    //     // },
    //     // (error) => {
    //     //     this.setState({
    //     //         isLoaded: true,
    //     //         error
    //     //     });
    //     // }
    //     // )

    //     }

    // }

    // trigger_clickLL(target,parent_id,obj){
    //     //get the scope for the link binary tree
    //     let flag = false;
    //     [].forEach.call(document.querySelectorAll('.binary-genealogy-tree'), function (e) {
    //         if(flag){
    //             e.remove();
    //         }
    //         // if(jQuery.contains(this, target)){
    //         // if (document.getElementsByTagName("*").includes(target)) {
    //         //    //delete all others
    //         //     flag = true;
    //         // }
    //     });
    //     //create the user which are fade in

    //     jQuery(obj).parent().parent().parent().parent().parent().parent().parent().find('.last_level_user').each(function(){
    //         jQuery(this).parent().fadeIn();

    //     });
    //     jQuery('.last_level_user').each(function(){
    //         jQuery(this).parent().removeClass('vertical_line');

    //     });
    //     jQuery(obj).parent().addClass('vertical_line');


    //     if(parent_id.length){
    //         jQuery.ajax({
    //             url : Drupal.settings.ajaxurl+'/'+ parent_id,
    //             'type' : 'GET',
    //             'async' : false,
    //             'success' : function(response){
    //                 jQuery('#block-system-main').append(response);
    //                 w= jQuery(obj).find('.fa-2x').offset().left;

    //                 tt = jQuery('.binary-genealogy-tree').eq( jQuery('.binary-genealogy-tree').length -1).find('.binary-node-single-item').eq(0).offset().left;

    //                     if(w>tt){
    //                         class_div="binar-hr-line-left";
    //                         width = w - tt;
    //                         css_style = 'margin-right';
    //                         //Glitch fixes

    //                         //w =jQuery('.binary-genealogy-tree').eq( jQuery('.binary-genealogy-tree').length -1).width()- w +jQuery(obj).width()+parseInt(jQuery('.main-content-row').css('margin-right').replace('px',''))-4;
    //                         w = jQuery('.binary-genealogy-tree').eq( jQuery('.binary-genealogy-tree').length -1).width()-(jQuery(obj).find('.fa-2x').offset().left-jQuery('.binary-genealogy-tree').eq( jQuery('.binary-genealogy-tree').length -1).offset().left+jQuery('.fa-2x').width()/2);
    //                         if(jQuery(obj).parent().parent().hasClass('node-right-item')){
    //                             w+=2;
    //                         }
    //                         width-=jQuery('.binary-genealogy-tree').eq( jQuery('.binary-genealogy-tree').length -1).find('.binary-node-single-item').eq(0).width()/2;
    //                         console.log(w);
    //                     }else{

    //                     class_div="binar-hr-line-right";
    //                     width = tt -w;
    //                     css_style = 'margin-left';
    //                     binary_tree_left = jQuery('.binary-genealogy-tree').eq( jQuery('.binary-genealogy-tree').length -1).offset().left;
    //                     //Glitch fixes

    //                         w-=binary_tree_left-jQuery(obj).find('.fa-2x').width()/2;
    //                         if(jQuery(obj).parent().parent().hasClass('node-right-item')){
    //                             w-=2;
    //                         }
    //                     width+=jQuery('.binary-genealogy-tree').eq( jQuery('.binary-genealogy-tree').length -1).find('.binary-node-single-item').eq(0).width()/2;

    //                     }
    //                 jQuery('.binary-genealogy-tree').eq( jQuery('.binary-genealogy-tree').length -1).prepend('<span class="line_logic hr_class '+class_div+' "></span>');
    //                 //position set up
    //                 jQuery('.binary-genealogy-tree').eq( jQuery('.binary-genealogy-tree').length -1).find('.hr_class').css('width',(width)+'px');
    //                 //get the binary tre left
    //                 jQuery('.binary-genealogy-tree').eq( jQuery('.binary-genealogy-tree').length -1).find('.hr_class').css(css_style,w+'px');
    //                 jQuery('.binary-genealogy-tree').eq( jQuery('.binary-genealogy-tree').length -1).addClass('binary_tree_extended');
    //                 jQuery('html,body').animate({scrollTop : jQuery('.binary-genealogy-tree').eq( jQuery('.binary-genealogy-tree').length -1).offset().top},1000);
    //                 jQuery(obj).parent().fadeOut();

    //                 jQuery('.node-left-item,.node-right-item').each(function(){
    //                 center = window.innerWidth/2;
    //                 pos = jQuery(this).offset().left;

    //                 if(center < pos){
    //                         jQuery(this).find('.pop-up-content').eq(0).addClass('right_tooltip');
    //                         //style = "left:"+(0-($('.pop-up-content').eq(0).width()+50))+'px';
    //                 }
    //                 });
    //                 return false;

    //             }

    //         });
    //     }
    //     return false;
    // }


    render(){
        return (
            <Layout page="Product">
                <div className="col-12 box-margin">
                    <div className="card">
                        {/* <div className="node-item-uid-ID node-left-item binary-level-width-50 node-item-uid-ID">
                            <span className="binary-hr-line binar-hr-line-left binary-hr-line-width-25 POSISI" />
                            <div className="node-item-1-child-left  node-child-root node-item-root" data-toggle="tooltip" data-placement="top" title="Tooltip on top">
                                <div data-gid="ID" className="binary-node-single-item user-block " id="user_block_ID">
                                    <div className="images_wrapper">
                                        <div className="avatar">
                                            <img src="http://ptnetindo.com:6700/images/user/user_2010293646ldyLz.png" alt="..." className="avatar-img rounded-circle" style={{width: 70, height: 70, marginLeft: '-17px', marginTop: '-11px'}} />
                                        </div>
                                    </div>
                                    <span className="wrap_content"><a href="/afl/genealogy-tree/2">test'</a></span>
                                    <div onclick="trigger_click(event.target,'');" className="last_level_user">
                                        <span className="add-genealogy-button"><i className="fa fa-plus fa-2x" /></span>
                                    </div>
                                </div>
                            </div>
                        </div> */}

                            <div id="accordion-ID" style={{borderStyle: 'solid', borderBottom: 'none', borderRight: 'none', borderColor: '#ffffff'}} >
                                <div className="card">
                                    <div className="card-header" id="headingOne-ID">
                                        {/* <h5 className="mb-0"> */}
                                        <button className="btn btn-link" data-toggle="collapse" onclick="getJaringan('ID')" data-target="#collapseOne-ID" aria-expanded="true" aria-controls="collapseOne-ID">
                                            <div className="row">
                                            <div className="col-md-3">
                                                <img src="http://ptnetindo.com:6700/images/user/user_2010293646ldyLz.png" alt="img" className="rounded-circle img-thumbnail" />
                                            </div>
                                            <div className="col-md-9">
                                                <p/>
                                                <h3 className="text-left">NAMA</h3><h3 className="text-left">ID</h3></div>
                                            </div>
                                        </button>
                                        {/* </h5> */}
                                    </div>
                                    <div id="collapseOne-ID" className="collapse" aria-labelledby="headingOne-ID" data-parent="#accordion-ID">
                                        <div className="card-body" id="res_indexID">
                                        tes2
                                        </div>
                                    </div>
                            </div>
                            </div>


                            <div id="block-system-main" className="block block-system clearfix">
  <div className="binary-genealogy-tree binary_tree_extended">
    <div className="binary-genealogy-level-0 clearfix">
      <div className="no_padding parent-wrapper clearfix">
        <div className="node-centere-item binary-level-width-100">
          <div className="node-item-root">
            <div className="binary-node-single-item user-block user-0"><div className="images_wrapper"><img className="profile-rounded-image-small" style={{borderColor: '#ccc'}} src="https://binary.epixelmlmsoftware.com/sites/binary/files/styles/genealogy-view/public/user-profile-images/business-man-1.jpg?itok=zhxmnAkU" width={70} height={70} alt="mlm.member" title="mlm.member" /></div>
              <span className="wrap_content ">mlm.member</span>
              <div className="pop-up-content">
                <div className="profile_tooltip_pick">
                  <div className="image_tooltip"><img className="profile-rounded-image-tooltip" src="https://binary.epixelmlmsoftware.com/sites/binary/files/styles/genealogy-view/public/user-profile-images/business-man-1.jpg?itok=zhxmnAkU" width={70} height={70} alt="mlm.member" title="mlm.member" /></div>
                  <div className="full-name">John Joseph </div>
                  <div className="username">
                    <span className="text-label">Username : </span>
                    <span className="text-value">mlm.member</span>
                  </div>
                </div>
                <div className="tooltip_profile_detaile">
                  <div className="text">
                    <span className="text-label">Sales (Left)</span>
                    <span className="text-value">$0.00</span>
                  </div>
                  <div className="text">
                    <span className="text-label">Sales (Right)</span>
                    <span className="text-value">$0.00</span>
                  </div>
                  <div className="text">
                    <span className="text-label">Carry-forward (Right)</span>
                    <span className="text-value">$0.00</span>
                  </div>
                  <div className="text">
                    <span className="text-label">Carry-forward (Left)</span>
                    <span className="text-value">$1,300.00</span>
                  </div>
                </div>
                <div className="tooltip-footer">
                  <div className="text">
                    <span className="text-label">Joined Date : </span>
                    <span className="text-value">2019-04-01 08:30:00</span>
                  </div>
                </div>
              </div></div>
          </div>
          <div className="parent-wrapper clearfix">
            <div className="node-left-item binary-level-width-50"> <span className="binary-hr-line binar-hr-line-left binary-hr-line-width-25" />
              <div className="node-item-1-child-left  node-item-root">
                <div className="binary-node-single-item user-block user-1"><div className="images_wrapper"><img className="profile-rounded-image-small" style={{borderColor: '#ccc'}} src="https://binary.epixelmlmsoftware.com/sites/binary/files/styles/genealogy-view/public/user-profile-images/formal-fashion-for-him.png?itok=-ACf3Iae" width={70} height={70} alt="walkerrobles" title="walkerrobles" /></div>
                  <span className="wrap_content ">walkerrobles</span>
                  <div className="pop-up-content">
                    <div className="profile_tooltip_pick">
                      <div className="image_tooltip"><img className="profile-rounded-image-tooltip" src="https://binary.epixelmlmsoftware.com/sites/binary/files/styles/genealogy-view/public/user-profile-images/formal-fashion-for-him.png?itok=-ACf3Iae" width={70} height={70} alt="walkerrobles" title="walkerrobles" /></div>
                      <div className="full-name">Walker Robles</div>
                      <div className="username">
                        <span className="text-label">Username : </span>
                        <span className="text-value">walkerrobles</span>
                      </div>
                    </div>
                    <div className="tooltip_profile_detaile">
                      <div className="text">
                        <span className="text-label">Sales (Left)</span>
                        <span className="text-value">$0.00</span>
                      </div>
                      <div className="text">
                        <span className="text-label">Sales (Right)</span>
                        <span className="text-value">$0.00</span>
                      </div>
                      <div className="text">
                        <span className="text-label">Carry-forward (Right)</span>
                        <span className="text-value">$0.00</span>
                      </div>
                      <div className="text">
                        <span className="text-label">Carry-forward (Left)</span>
                        <span className="text-value">$200.00</span>
                      </div>
                    </div>
                    <div className="tooltip-footer">
                      <div className="text">
                        <span className="text-label">Joined Date : </span>
                        <span className="text-value">2019-04-22 08:30:00</span>
                      </div>
                    </div>
                  </div> </div>
              </div>
              <div className="parent-wrapper clearfix">
                <div className="node-left-item binary-level-width-25"> <span className="binary-hr-line binar-hr-line-left binary-hr-line-width-12" />
                  <div className="node-item-2-child-left node-item-root">
                    <div className="binary-node-single-item user-block user-3"><div className="images_wrapper"><img className="profile-rounded-image-small" style={{borderColor: '#ccc'}} src="https://binary.epixelmlmsoftware.com/sites/binary/files/styles/genealogy-view/public/user-profile-images/22406366.png?itok=St1a7F3z" width={70} height={70} alt="brendanmccarty" title="brendanmccarty" /></div>
                      <span className="wrap_content ">brendanmccarty</span>
                      <div className="pop-up-content">
                        <div className="profile_tooltip_pick">
                          <div className="image_tooltip"><img className="profile-rounded-image-tooltip" src="https://binary.epixelmlmsoftware.com/sites/binary/files/styles/genealogy-view/public/user-profile-images/22406366.png?itok=St1a7F3z" width={70} height={70} alt="brendanmccarty" title="brendanmccarty" /></div>
                          <div className="full-name">Brendan Mccarty</div>
                          <div className="username">
                            <span className="text-label">Username : </span>
                            <span className="text-value">brendanmccarty</span>
                          </div>
                        </div>
                        <div className="tooltip_profile_detaile">
                          <div className="text">
                            <span className="text-label">Sales (Left)</span>
                            <span className="text-value">$0.00</span>
                          </div>
                          <div className="text">
                            <span className="text-label">Sales (Right)</span>
                            <span className="text-value">$0.00</span>
                          </div>
                          <div className="text">
                            <span className="text-label">Carry-forward (Right)</span>
                            <span className="text-value">$500.00</span>
                          </div>
                          <div className="text">
                            <span className="text-label">Carry-forward (Left)</span>
                            <span className="text-value">$0.00</span>
                          </div>
                        </div>
                        <div className="tooltip-footer">
                          <div className="text">
                            <span className="text-label">Joined Date : </span>
                            <span className="text-value">2019-06-05 08:30:00</span>
                          </div>
                        </div>
                      </div></div>
                  </div>
                  <div className="parent-wrapper clearfix">
                    <div className="node-left-item binary-level-width-50"> <span className="binary-hr-line binar-hr-line-left binary-hr-line-width-25" />
                      <div className="node-item-1-child-left">
                        <div className="binary-node-single-item user-block user-7"><div className="images_wrapper"><img className="profile-rounded-image-small" style={{borderColor: '#ccc'}} src="https://binary.epixelmlmsoftware.com/sites/binary/files/styles/genealogy-view/public/user-profile-images/20190617_men_mobile.jpg?itok=sRysVX0B" width={70} height={70} alt="rhonawashington" title="rhonawashington" /></div>
                          <span className="wrap_content ">rhonawashington</span>
                          <div className="pop-up-content">
                            <div className="profile_tooltip_pick">
                              <div className="image_tooltip"><img className="profile-rounded-image-tooltip" src="https://binary.epixelmlmsoftware.com/sites/binary/files/styles/genealogy-view/public/user-profile-images/20190617_men_mobile.jpg?itok=sRysVX0B" width={70} height={70} alt="rhonawashington" title="rhonawashington" /></div>
                              <div className="full-name">Rhona Washington</div>
                              <div className="username">
                                <span className="text-label">Username : </span>
                                <span className="text-value">rhonawashington</span>
                              </div>
                            </div>
                            <div className="tooltip_profile_detaile">
                              <div className="text">
                                <span className="text-label">Sales (Left)</span>
                                <span className="text-value">$0.00</span>
                              </div>
                              <div className="text">
                                <span className="text-label">Sales (Right)</span>
                                <span className="text-value">$0.00</span>
                              </div>
                              <div className="text">
                                <span className="text-label">Carry-forward (Right)</span>
                                <span className="text-value">$0.00</span>
                              </div>
                              <div className="text">
                                <span className="text-label">Carry-forward (Left)</span>
                                <span className="text-value">$100.00</span>
                              </div>
                            </div>
                            <div className="tooltip-footer">
                              <div className="text">
                                <span className="text-label">Joined Date : </span>
                                <span className="text-value">2019-07-24 08:30:00</span>
                              </div>
                            </div>
                          </div></div>
                        <div className="last_level_user" onclick="if (!window.__cfRLUnblockHandlers) return false; trigger_click(event.target,'25',this)"><i className="fa fa-plus-circle fa-2x" /></div>
                      </div>
                    </div>
                    <div className="node-right-item binary-level-width-50"> <span className="binary-hr-line binar-hr-line-right binary-hr-line-width-25" />
                      <div className="node-item-1-child-right">
                        <div className="binary-node-single-item user-block user-8"><div className="images_wrapper"><img className="profile-rounded-image-small" style={{borderColor: '#ccc'}} src="https://binary.epixelmlmsoftware.com/sites/binary/files/styles/genealogy-view/public/user-profile-images/jason-emery-fltc-066-4-800x440.jpg?itok=4uKiveQY" width={70} height={70} alt="biancahawkins" title="biancahawkins" /></div>
                          <span className="wrap_content ">biancahawkins</span>
                          <div className="pop-up-content">
                            <div className="profile_tooltip_pick">
                              <div className="image_tooltip"><img className="profile-rounded-image-tooltip" src="https://binary.epixelmlmsoftware.com/sites/binary/files/styles/genealogy-view/public/user-profile-images/jason-emery-fltc-066-4-800x440.jpg?itok=4uKiveQY" width={70} height={70} alt="biancahawkins" title="biancahawkins" /></div>
                              <div className="full-name">Bianca Hawkins</div>
                              <div className="username">
                                <span className="text-label">Username : </span>
                                <span className="text-value">biancahawkins</span>
                              </div>
                            </div>
                            <div className="tooltip_profile_detaile">
                              <div className="text">
                                <span className="text-label">Sales (Left)</span>
                                <span className="text-value">$0.00</span>
                              </div>
                              <div className="text">
                                <span className="text-label">Sales (Right)</span>
                                <span className="text-value">$0.00</span>
                              </div>
                              <div className="text">
                                <span className="text-label">Carry-forward (Right)</span>
                                <span className="text-value">$400.00</span>
                              </div>
                              <div className="text">
                                <span className="text-label">Carry-forward (Left)</span>
                                <span className="text-value">$0.00</span>
                              </div>
                            </div>
                            <div className="tooltip-footer">
                              <div className="text">
                                <span className="text-label">Joined Date : </span>
                                <span className="text-value">2019-07-24 08:30:00</span>
                              </div>
                            </div>
                          </div></div>
                        <div className="last_level_user" onclick="if (!window.__cfRLUnblockHandlers) return false; trigger_click(event.target,'32',this)"><i className="fa fa-plus-circle fa-2x" /></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="node-right-item binary-level-width-25"> <span className="binary-hr-line binar-hr-line-right binary-hr-line-width-12" />
                  <div className="node-item-2-child-right node-item-root">
                    <div className="binary-node-single-item user-block user-4"><div className="images_wrapper"><img className="profile-rounded-image-small" style={{borderColor: '#ccc'}} src="https://binary.epixelmlmsoftware.com/sites/binary/files/styles/genealogy-view/public/user-profile-images/career.jpg?itok=05qVQerN" width={70} height={70} alt="curranguzman" title="curranguzman" /></div>
                      <span className="wrap_content ">curranguzman</span>
                      <div className="pop-up-content">
                        <div className="profile_tooltip_pick">
                          <div className="image_tooltip"><img className="profile-rounded-image-tooltip" src="https://binary.epixelmlmsoftware.com/sites/binary/files/styles/genealogy-view/public/user-profile-images/career.jpg?itok=05qVQerN" width={70} height={70} alt="curranguzman" title="curranguzman" /></div>
                          <div className="full-name">Curran Guzman</div>
                          <div className="username">
                            <span className="text-label">Username : </span>
                            <span className="text-value">curranguzman</span>
                          </div>
                        </div>
                        <div className="tooltip_profile_detaile">
                          <div className="text">
                            <span className="text-label">Sales (Left)</span>
                            <span className="text-value">$0.00</span>
                          </div>
                          <div className="text">
                            <span className="text-label">Sales (Right)</span>
                            <span className="text-value">$0.00</span>
                          </div>
                          <div className="text">
                            <span className="text-label">Carry-forward (Right)</span>
                            <span className="text-value">$0.00</span>
                          </div>
                          <div className="text">
                            <span className="text-label">Carry-forward (Left)</span>
                            <span className="text-value">$200.00</span>
                          </div>
                        </div>
                        <div className="tooltip-footer">
                          <div className="text">
                            <span className="text-label">Joined Date : </span>
                            <span className="text-value">2019-06-19 08:30:00</span>
                          </div>
                        </div>
                      </div></div>
                  </div>
                  <div className="parent-wrapper clearfix">
                    <div className="node-left-item binary-level-width-50"> <span className="binary-hr-line binar-hr-line-left binary-hr-line-width-25" />
                      <div className="node-item-1-child-left">
                        <div className="binary-node-single-item user-block user-9"><div className="images_wrapper"><img className="profile-rounded-image-small" style={{borderColor: '#ccc'}} src="https://binary.epixelmlmsoftware.com/sites/binary/files/styles/genealogy-view/public/user-profile-images/images.squarespace-cdn.com_.jpeg?itok=g3iGxMQU" width={70} height={70} alt="rinaoliver" title="rinaoliver" /></div>
                          <span className="wrap_content ">rinaoliver</span>
                          <div className="pop-up-content">
                            <div className="profile_tooltip_pick">
                              <div className="image_tooltip"><img className="profile-rounded-image-tooltip" src="https://binary.epixelmlmsoftware.com/sites/binary/files/styles/genealogy-view/public/user-profile-images/images.squarespace-cdn.com_.jpeg?itok=g3iGxMQU" width={70} height={70} alt="rinaoliver" title="rinaoliver" /></div>
                              <div className="full-name">Rina Oliver</div>
                              <div className="username">
                                <span className="text-label">Username : </span>
                                <span className="text-value">rinaoliver</span>
                              </div>
                            </div>
                            <div className="tooltip_profile_detaile">
                              <div className="text">
                                <span className="text-label">Sales (Left)</span>
                                <span className="text-value">$0.00</span>
                              </div>
                              <div className="text">
                                <span className="text-label">Sales (Right)</span>
                                <span className="text-value">$0.00</span>
                              </div>
                              <div className="text">
                                <span className="text-label">Carry-forward (Right)</span>
                                <span className="text-value">$0.00</span>
                              </div>
                              <div className="text">
                                <span className="text-label">Carry-forward (Left)</span>
                                <span className="text-value">$0.00</span>
                              </div>
                            </div>
                            <div className="tooltip-footer">
                              <div className="text">
                                <span className="text-label">Joined Date : </span>
                                <span className="text-value">2019-07-24 08:30:00</span>
                              </div>
                            </div>
                          </div></div>
                        <div className="last_level_user" onclick="if (!window.__cfRLUnblockHandlers) return false; trigger_click(event.target,'33',this)"><i className="fa fa-plus-circle fa-2x" /></div>
                      </div>
                    </div>
                    <div className="node-right-item binary-level-width-50"> <span className="binary-hr-line binar-hr-line-right binary-hr-line-width-25" />
                      <div className="node-item-1-child-right">
                        <div className="binary-node-single-item user-block user-10"><div className="images_wrapper"><img className="profile-rounded-image-small" style={{borderColor: '#ccc'}} src="https://binary.epixelmlmsoftware.com/sites/binary/files/styles/genealogy-view/public/genealogy-img/common.png?itok=TpmAMsZE" width={70} height={70} alt="forrestnoel" title="forrestnoel" /></div>
                          <span className="wrap_content ">forrestnoel</span>
                          <div className="pop-up-content">
                            <div className="profile_tooltip_pick">
                              <div className="image_tooltip"><img className="profile-rounded-image-tooltip" src="https://binary.epixelmlmsoftware.com/sites/binary/files/styles/genealogy-view/public/genealogy-img/common.png?itok=TpmAMsZE" width={70} height={70} alt="forrestnoel" title="forrestnoel" /></div>
                              <div className="full-name">Forrest Noel</div>
                              <div className="username">
                                <span className="text-label">Username : </span>
                                <span className="text-value">forrestnoel</span>
                              </div>
                            </div>
                            <div className="tooltip_profile_detaile">
                              <div className="text">
                                <span className="text-label">Sales (Left)</span>
                                <span className="text-value">$0.00</span>
                              </div>
                              <div className="text">
                                <span className="text-label">Sales (Right)</span>
                                <span className="text-value">$0.00</span>
                              </div>
                              <div className="text">
                                <span className="text-label">Carry-forward (Right)</span>
                                <span className="text-value">$0.00</span>
                              </div>
                              <div className="text">
                                <span className="text-label">Carry-forward (Left)</span>
                                <span className="text-value">$0.00</span>
                              </div>
                            </div>
                            <div className="tooltip-footer">
                              <div className="text">
                                <span className="text-label">Joined Date : </span>
                                <span className="text-value">2019-07-24 08:30:00</span>
                              </div>
                            </div>
                          </div></div>
                        <div className="last_level_user" onclick="if (!window.__cfRLUnblockHandlers) return false; trigger_click(event.target,'34',this)"><i className="fa fa-plus-circle fa-2x" /></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="node-right-item binary-level-width-50"> <span className="binary-hr-line binar-hr-line-right binary-hr-line-width-25" />
              <div className="node-item-1-child-right   node-item-root">
                <div className="binary-node-single-item user-block user-2"><div className="images_wrapper"><img className="profile-rounded-image-small" style={{borderColor: '#ccc'}} src="https://binary.epixelmlmsoftware.com/sites/binary/files/styles/genealogy-view/public/user-profile-images/adult_close_up_eyeglasses_eyewear_face_facial_expression_fashion_fashion_model-1000789.jpg%21d.jpeg?itok=xXjvyVus" width={70} height={70} alt="karlynolan" title="karlynolan" /></div>
                  <span className="wrap_content ">karlynolan</span>
                  <div className="pop-up-content right_tooltip">
                    <div className="profile_tooltip_pick">
                      <div className="image_tooltip"><img className="profile-rounded-image-tooltip" src="https://binary.epixelmlmsoftware.com/sites/binary/files/styles/genealogy-view/public/user-profile-images/adult_close_up_eyeglasses_eyewear_face_facial_expression_fashion_fashion_model-1000789.jpg%21d.jpeg?itok=xXjvyVus" width={70} height={70} alt="karlynolan" title="karlynolan" /></div>
                      <div className="full-name">Karly Nolan</div>
                      <div className="username">
                        <span className="text-label">Username : </span>
                        <span className="text-value">karlynolan</span>
                      </div>
                    </div>
                    <div className="tooltip_profile_detaile">
                      <div className="text">
                        <span className="text-label">Sales (Left)</span>
                        <span className="text-value">$0.00</span>
                      </div>
                      <div className="text">
                        <span className="text-label">Sales (Right)</span>
                        <span className="text-value">$0.00</span>
                      </div>
                      <div className="text">
                        <span className="text-label">Carry-forward (Right)</span>
                        <span className="text-value">$200.00</span>
                      </div>
                      <div className="text">
                        <span className="text-label">Carry-forward (Left)</span>
                        <span className="text-value">$0.00</span>
                      </div>
                    </div>
                    <div className="tooltip-footer">
                      <div className="text">
                        <span className="text-label">Joined Date : </span>
                        <span className="text-value">2019-05-16 08:30:00</span>
                      </div>
                    </div>
                  </div></div>
              </div>
              <div className="parent-wrapper clearfix">
                <div className="node-left-item binary-level-width-25"> <span className="binary-hr-line binar-hr-line-left binary-hr-line-width-12" />
                  <div className="node-item-2-child-left node-item-root">
                    <div className="binary-node-single-item user-block user-5"><div className="images_wrapper"><img className="profile-rounded-image-small" style={{borderColor: '#ccc'}} src="https://binary.epixelmlmsoftware.com/sites/binary/files/styles/genealogy-view/public/user-profile-images/suit-for-a-civil-ceremony.jpg?itok=HsJLhfCa" width={70} height={70} alt="mechellelong" title="mechellelong" /></div>
                      <span className="wrap_content ">mechellelong</span>
                      <div className="pop-up-content right_tooltip">
                        <div className="profile_tooltip_pick">
                          <div className="image_tooltip"><img className="profile-rounded-image-tooltip" src="https://binary.epixelmlmsoftware.com/sites/binary/files/styles/genealogy-view/public/user-profile-images/suit-for-a-civil-ceremony.jpg?itok=HsJLhfCa" width={70} height={70} alt="mechellelong" title="mechellelong" /></div>
                          <div className="full-name">Mechelle Long</div>
                          <div className="username">
                            <span className="text-label">Username : </span>
                            <span className="text-value">mechellelong</span>
                          </div>
                        </div>
                        <div className="tooltip_profile_detaile">
                          <div className="text">
                            <span className="text-label">Sales (Left)</span>
                            <span className="text-value">$0.00</span>
                          </div>
                          <div className="text">
                            <span className="text-label">Sales (Right)</span>
                            <span className="text-value">$0.00</span>
                          </div>
                          <div className="text">
                            <span className="text-label">Carry-forward (Right)</span>
                            <span className="text-value">$200.00</span>
                          </div>
                          <div className="text">
                            <span className="text-label">Carry-forward (Left)</span>
                            <span className="text-value">$0.00</span>
                          </div>
                        </div>
                        <div className="tooltip-footer">
                          <div className="text">
                            <span className="text-label">Joined Date : </span>
                            <span className="text-value">2019-07-04 08:30:00</span>
                          </div>
                        </div>
                      </div></div>
                  </div>
                  <div className="parent-wrapper clearfix">
                    <div className="node-left-item binary-level-width-50"> <span className="binary-hr-line binar-hr-line-left binary-hr-line-width-25" />
                      <div className="node-item-1-child-left">
                        <div className="binary-node-single-item user-block user-11"><div className="images_wrapper"><a href="/afl/ref/17/12/LEFT/add/new-ref?u=eyJzcG9uc29yIjoiMTIiLCJwYXJlbnQiOiIxNyIsInBvc2l0aW9uIjoiTEVGVCIsInJldHVybl9wYXRoIjoiYWZsXC9nZW5lYWxvZ3ktdHJlZSJ9"><img className="profile-rounded-image-small" src="https://binary.epixelmlmsoftware.com/sites/binary/files/styles/genealogy-view/public/genealogy-img/no-user.png?itok=jHw_hHUZ" width={70} height={70} alt="Add new member" title="Add new member" /></a></div><span className="wrap_content"><a href="/afl/ref/17/12/LEFT/add/new-ref?u=eyJzcG9uc29yIjoiMTIiLCJwYXJlbnQiOiIxNyIsInBvc2l0aW9uIjoiTEVGVCIsInJldHVybl9wYXRoIjoiYWZsXC9nZW5lYWxvZ3ktdHJlZSJ9">Add new member</a></span></div>
                        <div className="last_level_user"><i className="fa fa-2x">&nbsp;</i></div>
                      </div>
                    </div>
                    <div className="node-right-item binary-level-width-50"> <span className="binary-hr-line binar-hr-line-right binary-hr-line-width-25" />
                      <div id="vl-42" className="node-item-1-child-right">
                        <div className="binary-node-single-item user-block user-12"><div className="images_wrapper"><img className="profile-rounded-image-small" style={{borderColor: '#ccc'}} src="https://binary.epixelmlmsoftware.com/sites/binary/files/styles/genealogy-view/public/genealogy-img/common.png?itok=TpmAMsZE" width={70} height={70} alt="dexaxe" title="dexaxe" /></div>
                          <span className="wrap_content ">dexaxe</span>
                          <div className="pop-up-content right_tooltip">
                            <div className="profile_tooltip_pick">
                              <div className="image_tooltip"><img className="profile-rounded-image-tooltip" src="https://binary.epixelmlmsoftware.com/sites/binary/files/styles/genealogy-view/public/genealogy-img/common.png?itok=TpmAMsZE" width={70} height={70} alt="dexaxe" title="dexaxe" /></div>
                              <div className="full-name">Brenna Hopper</div>
                              <div className="username">
                                <span className="text-label">Username : </span>
                                <span className="text-value">dexaxe</span>
                              </div>
                            </div>
                            <div className="tooltip_profile_detaile">
                              <div className="text">
                                <span className="text-label">Sales (Left)</span>
                                <span className="text-value">$0.00</span>
                              </div>
                              <div className="text">
                                <span className="text-label">Sales (Right)</span>
                                <span className="text-value">$0.00</span>
                              </div>
                              <div className="text">
                                <span className="text-label">Carry-forward (Right)</span>
                                <span className="text-value">$0.00</span>
                              </div>
                              <div className="text">
                                <span className="text-label">Carry-forward (Left)</span>
                                <span className="text-value">$0.00</span>
                              </div>
                            </div>
                            <div className="tooltip-footer">
                              <div className="text">
                                <span className="text-label">Joined Date : </span>
                                <span className="text-value">2019-07-24 08:30:00</span>
                              </div>
                            </div>
                          </div></div>
                        <div className="last_level_user" onClick={(e)=>this.trigger_click(e.target,'42',e.target,this)}><i id="fa-2x-42" className="fa fa-plus-circle fa-2x" /></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="node-right-item binary-level-width-25"> <span className="binary-hr-line binar-hr-line-right binary-hr-line-width-12" />
                  <div className="node-item-2-child-right node-item-root">
                    <div className="binary-node-single-item user-block user-6"><div className="images_wrapper"><img className="profile-rounded-image-small" style={{borderColor: '#ccc'}} src="https://binary.epixelmlmsoftware.com/sites/binary/files/styles/genealogy-view/public/user-profile-images/istockphoto-915981818-170667a.jpg?itok=a7_KMroU" width={70} height={70} alt="tallulahbarber" title="tallulahbarber" /></div>
                      <span className="wrap_content ">tallulahbarber</span>
                      <div className="pop-up-content right_tooltip">
                        <div className="profile_tooltip_pick">
                          <div className="image_tooltip"><img className="profile-rounded-image-tooltip" src="https://binary.epixelmlmsoftware.com/sites/binary/files/styles/genealogy-view/public/user-profile-images/istockphoto-915981818-170667a.jpg?itok=a7_KMroU" width={70} height={70} alt="tallulahbarber" title="tallulahbarber" /></div>
                          <div className="full-name">Tallulah Barber</div>
                          <div className="username">
                            <span className="text-label">Username : </span>
                            <span className="text-value">tallulahbarber</span>
                          </div>
                        </div>
                        <div className="tooltip_profile_detaile">
                          <div className="text">
                            <span className="text-label">Sales (Left)</span>
                            <span className="text-value">$0.00</span>
                          </div>
                          <div className="text">
                            <span className="text-label">Sales (Right)</span>
                            <span className="text-value">$0.00</span>
                          </div>
                          <div className="text">
                            <span className="text-label">Carry-forward (Right)</span>
                            <span className="text-value">$300.00</span>
                          </div>
                          <div className="text">
                            <span className="text-label">Carry-forward (Left)</span>
                            <span className="text-value">$0.00</span>
                          </div>
                        </div>
                        <div className="tooltip-footer">
                          <div className="text">
                            <span className="text-label">Joined Date : </span>
                            <span className="text-value">2019-07-24 08:30:00</span>
                          </div>
                        </div>
                      </div></div>
                  </div>
                  <div className="parent-wrapper clearfix">
                    <div className="node-left-item binary-level-width-50"> <span className="binary-hr-line binar-hr-line-left binary-hr-line-width-25" />
                      <div className="node-item-1-child-left">
                        <div className="binary-node-single-item user-block user-13"><div className="images_wrapper"><a href="/afl/ref/18/12/LEFT/add/new-ref?u=eyJzcG9uc29yIjoiMTIiLCJwYXJlbnQiOiIxOCIsInBvc2l0aW9uIjoiTEVGVCIsInJldHVybl9wYXRoIjoiYWZsXC9nZW5lYWxvZ3ktdHJlZSJ9"><img className="profile-rounded-image-small" src="https://binary.epixelmlmsoftware.com/sites/binary/files/styles/genealogy-view/public/genealogy-img/no-user.png?itok=jHw_hHUZ" width={70} height={70} alt="Add new member" title="Add new member" /></a></div><span className="wrap_content"><a href="/afl/ref/18/12/LEFT/add/new-ref?u=eyJzcG9uc29yIjoiMTIiLCJwYXJlbnQiOiIxOCIsInBvc2l0aW9uIjoiTEVGVCIsInJldHVybl9wYXRoIjoiYWZsXC9nZW5lYWxvZ3ktdHJlZSJ9">Add new member</a></span></div>
                        <div className="last_level_user"><i className="fa fa-2x">&nbsp;</i></div>
                      </div>
                    </div>
                    <div className="node-right-item binary-level-width-50"> <span className="binary-hr-line binar-hr-line-right binary-hr-line-width-25" />
                      <div id="vl-39" className="node-item-1-child-right">
                        <div className="binary-node-single-item user-block user-14"><div className="images_wrapper"><img className="profile-rounded-image-small" style={{borderColor: '#ccc'}} src="https://binary.epixelmlmsoftware.com/sites/binary/files/styles/genealogy-view/public/genealogy-img/common.png?itok=TpmAMsZE" width={70} height={70} alt="hileca" title="hileca" /></div>
                          <span className="wrap_content ">hileca</span>
                          <div className="pop-up-content right_tooltip">
                            <div className="profile_tooltip_pick">
                              <div className="image_tooltip"><img className="profile-rounded-image-tooltip" src="https://binary.epixelmlmsoftware.com/sites/binary/files/styles/genealogy-view/public/genealogy-img/common.png?itok=TpmAMsZE" width={70} height={70} alt="hileca" title="hileca" /></div>
                              <div className="full-name">Cade Padilla</div>
                              <div className="username">
                                <span className="text-label">Username : </span>
                                <span className="text-value">hileca</span>
                              </div>
                            </div>
                            <div className="tooltip_profile_detaile">
                              <div className="text">
                                <span className="text-label">Sales (Left)</span>
                                <span className="text-value">$0.00</span>
                              </div>
                              <div className="text">
                                <span className="text-label">Sales (Right)</span>
                                <span className="text-value">$0.00</span>
                              </div>
                              <div className="text">
                                <span className="text-label">Carry-forward (Right)</span>
                                <span className="text-value">$0.00</span>
                              </div>
                              <div className="text">
                                <span className="text-label">Carry-forward (Left)</span>
                                <span className="text-value">$0.00</span>
                              </div>
                            </div>
                            <div className="tooltip-footer">
                              <div className="text">
                                <span className="text-label">Joined Date : </span>
                                <span className="text-value">2019-07-24 08:30:00</span>
                              </div>
                            </div>
                          </div>
                          </div>
                        <div className="last_level_user" onClick={(e)=>this.trigger_click(e.target,'39',e.target,this)}><i id="fa-2x-39" className="fa fa-plus-circle fa-2x" /></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


                    </div>
                </div>


            </Layout>
        );
    }
}


const mapStateToProps = (state) => {
    console.log(state)
    return {
        // users:state.usersReducer.data,
        // isLoading2: state.usersReducer.isLoading,
        // userLevel:state.userLevelReducer.data,
        // isLoading3: state.userLevelReducer.isLoading,
        auth: state.auth

    }
}

export default connect(mapStateToProps)(Product)