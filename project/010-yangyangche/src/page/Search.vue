<template>
    <div>
        <Nav :push-down='true' />
        <div class="container">
            <SearchBar :onSubmit="on_submit" width='80%'/>
        </div>
        <div class="container">
            <div class="filter-list">
                <div class="kill-space filter">
                    <div class="col-lg-1 prop">品牌</div>
                    <div class="col-lg-10 range">
                        <span>不限</span>
                        <span>大众</span>
                        <span class="active">福特</span>
                        <span>奔驰</span>
                        <span>现代</span>
                        <span>大众</span>
                        <span>福特</span>
                        <span>奔驰</span>
                        <span>现代</span>
                        <span>大众</span>
                        <span>福特</span>
                        <span>奔驰</span>
                        <span>现代</span>
                    </div>
                    <div class="col-lg-1 right others"></div>
                </div>
                <div class="kill-space filter">
                    <div class="col-lg-1 prop">车系</div>
                    <div class="col-lg-10 range">
                        <span class="active">不限</span>
                        <span>朗逸</span>
                        <span>奔特</span>
                        <span>福驰</span>
                        <span>大代</span>
                        <span>现众</span>
                        <span>朗逸</span>
                        <span>奔特</span>
                        <span>福驰</span>
                        <span>大代</span>
                        <span>现众</span>
                    </div>
                    <div class="col-lg-1 right others"></div>
                </div>
                <div class="kill-space filter">
                    <div class="col-lg-1 prop">价格</div>
                    <div class="col-lg-10 range">
                        <span>不限</span>
                        <span class="active">3万以下</span>
                        <span>3-5万</span>
                        <span>5-8万</span>
                        <span>8-10万</span>
                        <span>10-15万</span>
                        <span>15-20万</span>
                        <span>20-30万</span>
                        <span>30万以上</span>
                    </div>
                    <div class="col-lg-1 right others"></div>
                </div>
                <div class="kill-space filter">
                    <div class="col-lg-1 prop">更多</div>
                    <div class="col-lg-10 range">
                        <!-- <Dropdown :onSelect="yo" :list="tmp"/>
                        <Dropdown :onSelect="yo" :list="tmp"/>
                        <Dropdown :onSelect="yo" :list="tmp"/>
                        <Dropdown :onSelect="yo" :list="tmp"/>
                        <Dropdown :onSelect="yo" :list="tmp"/>
                        <Dropdown :onSelect="yo" :list="tmp"/>
                        <Dropdown :onSelect="yo" :list="tmp"/>
                        <Dropdown :onSelect="yo" :list="tmp"/>
                        <Dropdown :onSelect="yo" :list="tmp"/>
                        <Dropdown :onSelect="yo" :list="tmp"/> -->
                    </div>
                    <div class="col-lg-1 right others"></div>
                </div>
            </div>
        </div>  
        <div class="container">
            <div class="row vehicle-list">
                <div class="col-lg-3">
                    <div class="card">
                    <div class="thumbnail">
                        <img src="../assets/home/vehicle-list-thumbnail1.webp">
                    </div>
                    <div class="detail">
                        <div class="title">大众-高尔夫 2014款 1.6L 自动舒适型</div>
                        <div class="desc">2015年02月 / 3.07万公里</div>
                        <div class="others">
                        <span class="price">11.5万</span>
                        <span>首付3.5万</span>
                        <a class="btn btn-primary buy">购买</a>
                        </div>
                    </div>
                    </div>
                </div>
                <div class="col-lg-3">
                    <div class="card">
                    <div class="thumbnail">
                        <img src="../assets/home/vehicle-list-thumbnail1.webp">
                    </div>
                    <div class="detail">
                        <div class="title">大众-高尔夫 2014款 1.6L 自动舒适型</div>
                        <div class="desc">2015年02月 / 3.07万公里</div>
                        <div class="others">
                        <span class="price">11.5万</span>
                        <span>首付3.5万</span>
                        <a class="btn btn-primary buy">购买</a>
                        </div>
                    </div>
                    </div>
                </div>
                <div class="col-lg-3">
                    <div class="card">
                    <div class="thumbnail">
                        <img src="../assets/home/vehicle-list-thumbnail1.webp">
                    </div>
                    <div class="detail">
                        <div class="title">大众-高尔夫 2014款 1.6L 自动舒适型</div>
                        <div class="desc">2015年02月 / 3.07万公里</div>
                        <div class="others">
                        <span class="price">11.5万</span>
                        <span>首付3.5万</span>
                        <a class="btn btn-primary buy">购买</a>
                        </div>
                    </div>
                    </div>
                </div>
                <div class="col-lg-3">
                    <div class="card">
                    <div class="thumbnail">
                        <img src="../assets/home/vehicle-list-thumbnail1.webp">
                    </div>
                    <div class="detail">
                        <div class="title">大众-高尔夫 2014款 1.6L 自动舒适型</div>
                        <div class="desc">2015年02月 / 3.07万公里</div>
                        <div class="others">
                        <span class="price">11.5万</span>
                        <span>首付3.5万</span>
                        <a class="btn btn-primary buy">购买</a>
                        </div>
                    </div>
                    </div>
                </div>
                <div class="col-lg-3">
                    <div class="card">
                    <div class="thumbnail">
                        <img src="../assets/home/vehicle-list-thumbnail1.webp">
                    </div>
                    <div class="detail">
                        <div class="title">大众-高尔夫 2014款 1.6L 自动舒适型</div>
                        <div class="desc">2015年02月 / 3.07万公里</div>
                        <div class="others">
                        <span class="price">11.5万</span>
                        <span>首付3.5万</span>
                        <a class="btn btn-primary buy">购买</a>
                        </div>
                    </div>
                    </div>
                </div>
                <div class="col-lg-3">
                    <div class="card">
                    <div class="thumbnail">
                        <img src="../assets/home/vehicle-list-thumbnail1.webp">
                    </div>
                    <div class="detail">
                        <div class="title">大众-高尔夫 2014款 1.6L 自动舒适型</div>
                        <div class="desc">2015年02月 / 3.07万公里</div>
                        <div class="others">
                        <span class="price">11.5万</span>
                        <span>首付3.5万</span>
                        <a class="btn btn-primary buy">购买</a>
                        </div>
                    </div>
                    </div>
                </div>
                <div class="col-lg-3">
                    <div class="card">
                    <div class="thumbnail">
                        <img src="../assets/home/vehicle-list-thumbnail1.webp">
                    </div>
                    <div class="detail">
                        <div class="title">大众-高尔夫 2014款 1.6L 自动舒适型</div>
                        <div class="desc">2015年02月 / 3.07万公里</div>
                        <div class="others">
                        <span class="price">11.5万</span>
                        <span>首付3.5万</span>
                        <a class="btn btn-primary buy">购买</a>
                        </div>
                    </div>
                    </div>
                </div>
                <div class="col-lg-3">
                    <div class="card">
                    <div class="thumbnail">
                        <img src="../assets/home/vehicle-list-thumbnail1.webp">
                    </div>
                    <div class="detail">
                        <div class="title">大众-高尔夫 2014款 1.6L 自动舒适型</div>
                        <div class="desc">2015年02月 / 3.07万公里</div>
                        <div class="others">
                        <span class="price">11.5万</span>
                        <span>首付3.5万</span>
                        <a class="btn btn-primary buy">购买</a>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Nav from '../components/Nav';
    import SearchBar from '../components/SearchBar';
    import Dropdown from '../components/Dropdown';

    import '../css/vehicle-list.css';

    export default {
        components: {
            Nav, SearchBar, Dropdown
        },
        data: function () {
            return {
                tmp: [
                    {name: '1年以下', value: 1},
                    {name: '1年', value: 2},
                    {name: '2年', value: 3},
                    {name: '3年', value: 4},
                    {name: '3年以上', value: 5}
                ]
            }
        }
    }
</script>

<style>
    .filter-list {
        margin-top: 15px;
        border: 1px solid rgba(0, 0, 0, .1);
        border-radius: 3px;
    }

    .filter {
        border-bottom: 1px solid rgba(0, 0, 0, .1);
    }

    .filter:last-child {
        border-bottom: 0;
    }

    .filter >* {
        vertical-align: middle;
    }

    .filter .prop,
    .filter .others {
        padding-top: 10px;
        padding-bottom: 10px;
        font-size: 14px;
    }

    .filter .prop {
        max-width: 66px;
        /* font-size: 14px; */
        font-weight: lighter;
        text-align: center;
        background: #eee;
    }

    .filter .range span {
        cursor: pointer;
        padding: 5px 10px;
    }
    
    .filter .range span:hover {
        color: #fd521d;
    }

    .filter .range span.active {
        background: #fd521d;
        opacity: .8;
        color: #fff;
    }


</style>
