<!doctype html>
<html>

<head>
    <title>WayFinder</title>
    <meta charset="utf-8">
    <meta name="HandheldFriendly" content="true">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=-1,user-scalable=no">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="viewport" content="width=device-width">

    <script src="<?php echo base_url(); ?>assets/js/jquery-1.12.4.min.js"></script>
    <script src="<?php echo base_url(); ?>assets/js/svg-pan-zoom.js"></script>
    <link rel="stylesheet" href="<?php echo base_url(); ?>assets/libs-third-party/uikit/uikit-3.7.2/css/uikit.min.css" />
    <link rel="stylesheet" href="<?php echo base_url(); ?>assets/css/df-wayfinder.css">
    <script src="<?php echo base_url(); ?>assets/libs-third-party/uikit/uikit-3.7.2/js/uikit.min.js"></script>
    <script src="<?php echo base_url(); ?>assets/libs-third-party/uikit/uikit-3.7.2/js/uikit-icons.min.js"></script>
    <script src="<?php echo base_url(); ?>assets/js/jquery.wayfinding-new.js"></script>

</head>

<body>
    <div id="templates" style="display:none;">
        <div id="template_shopListFilterConatinerCharacter">
            <ul class="uk-subnav uk-subnav-pill hide-filter-list-character uk-margin-remove">
            </ul>
        </div>
        <div id="template_shopListFilterCategory">
            <div>
                <img onclick="category_selection()" uk-filter-control="filter:[data-category~='category'];group:category" src="<?php echo base_url(); ?> test/shop_finder_sub_category/defaultShopCat.png" class="imageDimention">
            </div>
        </div>
        <div id="template_shopListFilterCategory1">
            <button onclick="category_selection()" uk-filter-control="filter:[data-category~='category'];group:category">Category</button>
        </div>

        <div id="template_shopListFilterCharacter">
            <li uk-filter-control="filter:[data-category~='character'];group:character"><a href="#">character</a></li>
        </div>

        <div id="template_shopListItem">
            <div class="uk-flex uk-flex-center uk-flex-middle">
                <img class="uk-box-shadow-medium uk-padding shopLogo" src=" <?php echo base_url(); ?>images/shops/logo/defaultShop.png" alt="shopName">
            </div>
        </div>
        <div id="template_amenity">
            <div>
                <img src="<?php echo base_url(); ?> images/amenities/default.svg" alt="amenityName" class="amenityLogo">
            </div>
        </div>
        <div id="template_floorListItemBtn">
            <button class="uk-padding-remove uk-button" type="radio"><label class="uk-text-large uk-text-bold uk-text-middle"></label></button>
        </div>
    </div>
    <div>
        <div id="myMaps" class="uk-position-center-left" style="width: 90%;"></div>
        <div id="head_map" style="position: absolute; top: 5%; left: 5%;">
            <h3 id="map" class="uk-text-bold"></h3>
        </div>
        <div id="head_way" style="position: absolute; top: 5%; right: 15%;">
            <h3 id="way" class="blink uk-text-bold"></h3>
        </div>
        <div id="controls" class="uk-grid-small uk-position-center-right uk-child-width-1-1" style="width: 8%; right: 1%;">
            <div class="uk-padding-remove uk-grid-small uk-child-width-1-2 uk-child-width-1-1@m" uk-grid>
                <div>
                    <input id="toggle" class='input-switch' type="checkbox" />
                    <label class="label-switch" for="toggle"></label>
                    <span class="info-text"></span>
                </div>
            </div>
            <div id="floor_controllersBtn" class="uk-padding-remove uk-grid-small uk-child-width-1-2 uk-child-width-1-1@m" uk-grid>
            </div>
            <div class="uk-padding-remove uk-grid-small uk-child-width-1-2 uk-child-width-1-1@m" uk-grid>
                <button class="uk-padding-remove uk-button" uk-toggle="target: #modal_shops" onclick="reset_filter()"> <img src="<?php echo base_url(); ?>images/shops.png"></button>
                <button class="uk-padding-remove uk-button" uk-toggle="target: #modal_amenities"> <img src="<?php echo base_url(); ?>images/amenities.png"></button>
            </div>
        </div>
        <div id="modal_shops" uk-modal>
            <div id="modal_dialog_shops" class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical uk-width-1-1" uk-height-viewport="offset-bottom: 20">
                <button id="modal_shops_close" class="uk-modal-close-outside" type="button" uk-close></button>
                <div uk-filter="target: .js-filter" class="uk-width-1-1">
                    <div id="filter_category" class="uk-grid-small uk-child-width-1-4 uk-flex-center" uk-grid>
                    </div>
                    <div id="shops_list_filter" class="uk-hidden uk-width-expand">
                        <div class="uk-grid-small uk-flex-top" uk-grid>
                            <div class="uk-width-auto uk-text-nowrap">
                                <ul class="uk-subnav uk-subnav-pill">
                                    <li><a class="uk-icon-link" href="#" uk-icon="icon: arrow-left" onclick="reset_filter()"></a></li>
                                </ul>
                            </div>
                            <div class="uk-width-expand uk-flex-center">
                                <div class="uk-flex-center uk-grid-small uk-grid-divider" uk-grid>
                                    <ul class="uk-subnav uk-subnav-pill">
                                        <li id="reset_filter_character" class="uk-active" uk-filter-control="filter:;group:character"><a href="#">All</a></li>
                                    </ul>
                                    <div id="filter_character">
                                    </div>
                                </div>
                            </div>
                            <div class="uk-width-auto uk-text-nowrap">
                                <ul class="uk-subnav uk-subnav-pill">
                                    <li class="uk-active" uk-filter-control="sort: data-name"><a class="uk-icon-link" href="#" uk-icon="icon: arrow-down"></a></li>
                                    <li uk-filter-control="sort: data-name; order: desc"><a class="uk-icon-link" href="#" uk-icon="icon: arrow-up"></a></li>
                                </ul>
                            </div>
                        </div>
                        <div class="uk-margin-small uk-flex uk-flex-center" uk-overflow-auto>
                            <div id="shops_list" class="js-filter uk-flex uk-flex-center uk-grid-small uk-width-1-1 uk-child-width-1-2 uk-child-width-1-3@s uk-child-width-1-4@m uk-child-width-1-6@l" uk-grid>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="modal_amenities" uk-modal>
            <div id="modal_dialog_amenities" class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical">
                <button id="modal_amenities_close" class="uk-modal-close-outside" type="button" uk-close></button>
                <figure id="amenListView" class="uk-flex uk-flex-center uk-grid-small uk-child-width-1-3 uk-child-width-1-5@m" uk-grid>
                </figure>
            </div>
        </div>
    </div>

    <script src="<?php echo base_url(); ?>assets/js/df-wayfinder.js"></script>
</body>

</html>