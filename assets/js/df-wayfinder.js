function wayfinder_init(floors, route) {
  $('#myMaps').wayfinding({
    'maps': floors,
    'path': route,
    'startpoint': 'lcd.1',
    'defaultMap': 'floorG',
    'zoomToRoute': false,
    'accessibleRoute': false,
    'showLocation': true
  }, function () {
    console.log('WayFinder is ready!!!');
  });
}

function wayfinder_floor(floors) {
  for (floor of floors) {
    var id = "map_" + floor.id;
    var floorItem = document.getElementById("template_floorListItemBtn").firstElementChild.cloneNode(true);
    floorItem.setAttribute("id", id);
    floorItem.setAttribute("data-floor-id", floor.id);
    floorItem.setAttribute("data-title", floor.title);
    floorItem.firstElementChild.setAttribute("src", floor.logo);
    floorItem.firstElementChild.innerHTML = floor.label;
    document.getElementById("floor_controllersBtn").appendChild(floorItem);
  }

  $('#floor_controllersBtn button').on('click', function () {
    $('#myMaps').wayfinding('currentMap', $(this).data('floor-id'));
  });
}

function shopList_category(categories) {
  for (var category of categories) {
    var shopList = document.getElementById("template_shopList").cloneNode(true);
    shopList.setAttribute("id", "shopList_" + category.id);
    document.getElementById("shopListCatView").appendChild(shopList);
    $('#' + "shopList_" + category.id).css('display', 'none');

    var shopCat = document.getElementById("template_shopCat").firstElementChild.cloneNode(true);
    shopCat.setAttribute("id", "shopCat_" + category.id);
    shopCat.setAttribute("data-shoplistele", "shopList_" + category.id);

    var element = shopCat.querySelectorAll('.imageDimention');
    element[0].setAttribute("src", category.logo);

    document.getElementById("filter_category").appendChild(shopCat);

    $('#' + "shopCat_" + category.id).on('click', function () {
      $('#filterdata').css('display', 'none');
      $('#' + $(this).data('shoplistele')).css('display', 'block');
      $('#' + $(this).data('shoplistele') + ' [data-filter = "all"]').trigger('click');
    });
  }
}

function wayfinder_shop(shops, categories) {
  var category_list = {};
  for (var category of categories) {
    if (category_list[category.id] == undefined) {
      category_list[category.id] = category;
      category_list[category.id].character_list = [];
    }
  }

  var shopList = document.getElementById("shops_list");

  for (var shop of shops) {
    if (shop.label == "") {
      continue
    }
    for (var category of shop.categories) {
      if (category_list[category] == undefined) {
        console.log('Category not exist: ', category);
        continue
      }
      for (var filter of shop.filters) {
        if (category_list[category].character_list.indexOf(filter) == -1)
          category_list[category].character_list.push(filter);
      }
    }
    id = "shopLI_" + shop.id;

    var shopElem = document.getElementById("template_shopListItem").firstElementChild.cloneNode(true);
    shopElem.setAttribute("id", id);
    shopElem.setAttribute("data-name", shop.label);
    shopElem.setAttribute("data-character", shop.filters.join(' '));
    shopElem.setAttribute("data-category", shop.categories.join(' '));

    var id = "shop_" + shop.id;
    var element = shopElem.querySelectorAll('.shopLogo')[0];
    element.setAttribute("id", id);
    element.setAttribute("alt", shop.label);
    element.setAttribute("src", shop.logo);
    if (shop.routeTo) {
      element.setAttribute("data-routeto", shop.routeTo);
    }
    if (shop.routeToNearest) {
      element.setAttribute("data-routetonearest", shop.routeToNearest);
    }
    shopList.appendChild(shopElem);
  }

  $('.shopLogo').on('click', function () {
    if ($(this).data('routetonearest')) {
      $('#myMaps').wayfinding('routeToNearest', $(this).data('routetonearest'));
    }
    else {
      $('#myMaps').wayfinding('routeTo', $(this).data('routeto'));
    }
    document.getElementById('modal_shops_close').click();
  });

  for (var category in category_list) {
    var filterItem = document.getElementById("template_shopListFilterCategory").firstElementChild.cloneNode(true);
    filterItem.setAttribute("id", "filter_category_" + category);
    document.getElementById("filter_category").appendChild(filterItem);

    var id = "filter_category_" + category.id;
    var filterEle = filterItem.querySelectorAll('.imageDimention')[0];
    filterEle.setAttribute("id", "filter_category_" + category.id);
    filterEle.setAttribute("uk-filter-control", "filter:[data-category~='" + category + "'];group:category")
    filterEle.setAttribute("src", category_list[category].logo);
    filterEle.setAttribute("data-category-name", category);
    filterItem.appendChild(filterEle);

    var filterItemContainer = document.getElementById("template_shopListFilterConatinerCharacter").firstElementChild.cloneNode(true);
    filterItemContainer.setAttribute("id", "filter_character_" + category);
    document.getElementById("filter_character").appendChild(filterItemContainer);

    var filter_list = category_list[category].character_list;
    filter_list.sort().join("");
    for (filter of filter_list) {
      var filterItem = document.getElementById("template_shopListFilterCharacter").firstElementChild.cloneNode(true);
      filterItem.setAttribute("uk-filter-control", "filter:[data-character~='" + filter + "'];group:character");
      filterItem.firstElementChild.innerHTML = filter;
      filterItemContainer.appendChild(filterItem);
    }
  }
}

function wayfinder_amenities(amenities) {
  for (amenity_item of amenities) {
    id = "amenityLI_" + amenity_item.id;
    var element = document.getElementById("template_amenity").firstElementChild.cloneNode(true);
    element.setAttribute("id", id);
    document.getElementById("amenListView").appendChild(element);

    var id = "amenity_" + amenity_item.id;
    var amenityEle = element.querySelectorAll('.amenityLogo')[0];
    amenityEle.setAttribute("id", id);
    amenityEle.setAttribute("id", "amenity_" + amenity_item.id);
    amenityEle.setAttribute("alt", amenity_item.label);
    amenityEle.setAttribute("src", amenity_item.logo);
    element.appendChild(amenityEle);

    if (amenity_item.preclass) {
      amenityEle.setAttribute("data-preclass", amenity_item.preclass);
    }
    else {
      amenityEle.setAttribute("data-preclass", amenity_item.id);
    }
    if (amenity_item.routeTo) {
      amenityEle.setAttribute("data-routeto", amenity_item.routeTo);
    }
    if (amenity_item.routeToNearest) {
      amenityEle.setAttribute("data-routetonearest", amenity_item.routeToNearest);
    }
    if (amenity_item.routeOption) {
      amenityEle.setAttribute("data-routeoption", amenity_item.routeOption);
    }
    if (amenity_item.highlight) {
      amenityEle.setAttribute("data-highlight", amenity_item.highlight);
    }
  }

  $('.amenityLogo').on('click', function () {
    if ($(this).data('routeoption') == 'accessible' && !$('#myMaps').wayfinding('accessibleRoute')) {
      document.getElementById('toggle').click();
    }
    if ($(this).data('highlight')) {
      $('#myMaps').wayfinding('addClass', { 'preclass': $(this).data('preclass'), 'class': $(this).data('highlight') });
      displayWayToLabel($(this).attr('alt'));
    }
    if ($(this).data('routetonearest')) {
      $('#myMaps').wayfinding('routeToNearest', $(this).data('routetonearest'));
    } else if ($(this).data('routeto')) {
      $('#myMaps').wayfinding('routeTo', $(this).data('routeto'));
    }
    document.getElementById('modal_amenities_close').click();
  });
}

function category_selection(e) {
  e = e || window.event;
  e = e.target || e.srcElement;
  var eles = document.getElementById("filter_character").querySelectorAll(".show-filter-list-character");
  for (var i = 0; i < eles.length; i++) {
    eles[i].classList.remove("show-filter-list-character");
    eles[i].classList.add("hide-filter-list-character");
  }
  var ele = document.getElementById("filter_character_" + e.getAttribute("data-category-name"));
  ele.classList.add("show-filter-list-character");
  ele.classList.remove("hide-filter-list-character");
  document.getElementById("modal_dialog_shops").classList.remove("uk-flex");
  document.getElementById("modal_dialog_shops").classList.remove("uk-flex-middle");
  document.getElementById("reset_filter_character").click();
  document.getElementById("filter_category").classList.add("uk-hidden");
  document.getElementById("shops_list_filter").classList.remove("uk-hidden");
}

function reset_filter() {
  document.getElementById("modal_dialog_shops").classList.add("uk-flex");
  document.getElementById("modal_dialog_shops").classList.add("uk-flex-middle");
  document.getElementById("shops_list_filter").classList.add("uk-hidden");
  document.getElementById("filter_category").classList.remove("uk-hidden");
}

function load_bulding() {
  $.ajax({
    url: 'bulding-gokulam-galleria.json',
    // url: 'bulding-amanora.json',
    dataType: 'json',
    success: function (data) {
      wayfinder_init(data.floors, data.route);
      wayfinder_floor(data.floors);
      wayfinder_shop(data.shops, data.categories);
      wayfinder_amenities(data.amenities);
    }
  });
}

$(document).ready(function () {
  'use strict';
  load_bulding();
  if (document.getElementById('toggle').checked)
    document.getElementById('toggle').click();
  document.getElementById('toggle').addEventListener('change', function (event) {
    $('#myMaps').wayfinding('accessibleRoute', event.currentTarget.checked);
  });
});

$("#myMaps").on("wayfinding:mapsVisible", function (event, map) {
  if (typeof (map) == 'undefined' || map == null) {
    map = {}
    map.mapId = $('#myMaps').wayfinding('currentMap');
  }
  $('.df-btn-current-floor').removeClass('df-btn-current-floor');
  $("#map_" + map.mapId).addClass('df-btn-current-floor');
  document.getElementById('map').innerHTML = $("#map_" + map.mapId).data('title');
});

$("#myMaps").on("wayfinding:floorChanged", function (event, map) {
  $('.df-btn-current-floor').removeClass('df-btn-current-floor');
  $("#map_" + map.mapId).addClass('df-btn-current-floor');
  document.getElementById('map').innerHTML = $("#map_" + map.mapId).data('title');
});

$("#myMaps").on("wayfinding:wayto", function (event, room) {
  displaydestinationname(room.roomId);
  $('#Rooms a').find('*').css('pointer-events', 'none');
  $("#controls button").prop('disabled', true);
});

$("#myMaps").on("wayfinding:animationComplete", function (event) {
  $('#Rooms a').find('*').css('pointer-events', 'auto');
  $("#controls button").prop('disabled', false);
});

function displaydestinationname(id) {
  var element = document.getElementById(id);
  if (typeof (element) != 'undefined' && element != null && id == '') {
    document.getElementById('way').innerHTML = "";
  }
  else {
    document.getElementById('way').innerHTML = "Way to " + $('#' + id).attr('name');
  }
}

function displayAmenityName(id) {
  var element = document.getElementById(id);
  if (typeof (element) != 'undefined' && element != null && id == '') {
    document.getElementById('way').innerHTML = "";
  }
  else {
    document.getElementById('way').innerHTML = $('#' + id).attr('name');
  }
}

function displayWayToLabel(label) {
  document.getElementById('way').innerHTML = label;
}

// right click 
document.addEventListener('contextmenu', event => event.preventDefault());
