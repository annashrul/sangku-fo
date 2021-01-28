import React, {Component} from 'react'

class Cards extends Component {
    render(){
        return(
            <div className="card bg-boxshadow full-height">
                <div className="card-header bg-transparent user-area d-flex align-items-center justify-content-between">
                    <h5 className="card-title mb-0">Member Baru</h5>
                    {/* Nav Tabs */}
                    <ul className="nav total-earnings nav-tabs mb-0" role="tablist">
                    <li className="nav-item">
                        <a className="nav-link show" id="today-users-tab" data-toggle="tab" href="#today-users" role="tab" aria-controls="today-users" aria-selected="false">Sponsor</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link mr-0 active" id="month-users-tab" data-toggle="tab" href="#month-users" role="tab" aria-controls="month-users" aria-selected="true">Downline</a>
                    </li>
                    </ul>
                </div>
                <div className="card-body">
                    <div className="tab-content" id="userList2">
                    <div className="tab-pane fade" id="today-users" role="tabpanel" aria-labelledby="today-users-tab">
                        <ul className="total-earnings-list">
                        <li>
                            <div className="author-info d-flex align-items-center">
                            <div className="author-img mr-3">
                                <img src="img/member-img/team-2.jpg" alt="" />
                            </div>
                            <div className="author-text">
                                <h6 className="mb-0">Ajoy Das</h6>
                                <p className="mb-0">Product Designer</p>
                            </div>
                            </div>
                            <a href="#" className="badge badge-primary">Follow</a>
                        </li>
                        <li>
                            <div className="author-info d-flex align-items-center">
                            <div className="author-img mr-3">
                                <img src="img/member-img/team-3.jpg" alt="" />
                            </div>
                            <div className="author-text">
                                <h6 className="mb-0">Niloy Disk</h6>
                                <p className="mb-0">Web Developer</p>
                            </div>
                            </div>
                            <a href="#" className="badge badge-primary">Follow</a>
                        </li>
                        <li>
                            <div className="author-info d-flex align-items-center">
                            <div className="author-img mr-3">
                                <img src="img/member-img/team-4.jpg" alt="" />
                            </div>
                            <div className="author-text">
                                <h6 className="mb-0">Wiltor Delton</h6>
                                <p className="mb-0">Project Manager</p>
                            </div>
                            </div>
                            <a href="#" className="badge badge-primary">Follow</a>
                        </li>
                        <li>
                            <div className="author-info d-flex align-items-center">
                            <div className="author-img mr-3">
                                <img src="img/member-img/team-5.jpg" alt="" />
                            </div>
                            <div className="author-text">
                                <h6 className="mb-0">Nick Stone</h6>
                                <p className="mb-0">Visual Designer</p>
                            </div>
                            </div>
                            <a href="#" className="badge badge-primary">Follow</a>
                        </li>
                        <li>
                            <div className="author-info d-flex align-items-center">
                            <div className="author-img mr-3">
                                <img src="img/member-img/team-7.jpg" alt="" />
                            </div>
                            <div className="author-text">
                                <h6 className="mb-0">Wiltor Delton</h6>
                                <p className="mb-0">Project Manager</p>
                            </div>
                            </div>
                            <a href="#" className="badge badge-primary">Follow</a>
                        </li>
                        </ul>
                    </div>
                    <div className="tab-pane fade active show" id="month-users" role="tabpanel" aria-labelledby="month-users-tab">
                        <ul className="total-earnings-list">
                        <li>
                            <div className="author-info d-flex align-items-center">
                            <div className="author-img mr-3">
                                <img src="img/member-img/2.png" alt="" />
                            </div>
                            <div className="author-text">
                                <h6 className="mb-0">Wiltor Delton</h6>
                                <p className="mb-0">Project Manager</p>
                            </div>
                            </div>
                            <a href="#" className="badge badge-primary">Follow</a>
                        </li>
                        <li>
                            <div className="author-info d-flex align-items-center">
                            <div className="author-img mr-3">
                                <img src="img/member-img/3.png" alt="" />
                            </div>
                            <div className="author-text">
                                <h6 className="mb-0">Ajoy Das</h6>
                                <p className="mb-0">Product Designer</p>
                            </div>
                            </div>
                            <a href="#" className="badge badge-primary">Follow</a>
                        </li>
                        <li>
                            <div className="author-info d-flex align-items-center">
                            <div className="author-img mr-3">
                                <img src="img/member-img/4.png" alt="" />
                            </div>
                            <div className="author-text">
                                <h6 className="mb-0">Niloy Disk</h6>
                                <p className="mb-0">Web Developer</p>
                            </div>
                            </div>
                            <a href="#" className="badge badge-primary">Follow</a>
                        </li>
                        <li>
                            <div className="author-info d-flex align-items-center">
                            <div className="author-img mr-3">
                                <img src="img/member-img/1.png" alt="" />
                            </div>
                            <div className="author-text">
                                <h6 className="mb-0">Nazrul Islam</h6>
                                <p className="mb-0">Visual Designer</p>
                            </div>
                            </div>
                            <a href="#" className="badge badge-primary">Follow</a>
                        </li>
                        <li>
                            <div className="author-info d-flex align-items-center">
                            <div className="author-img mr-3">
                                <img src="img/member-img/5.png" alt="" />
                            </div>
                            <div className="author-text">
                                <h6 className="mb-0">Nick Stone</h6>
                                <p className="mb-0">Visual Designer</p>
                            </div>
                            </div>
                            <a href="#" className="badge badge-primary">Follow</a>
                        </li>
                        </ul>
                    </div>
                    </div>
                </div>
                </div>

        )
    }
}

export default Cards;