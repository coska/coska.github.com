
'use strict';
//var apiBase = '/html/apiTest';
var apiBase = '/api';

var churchApp = angular.module('churchApp', [ 'youtube-embed', 'ngSanitize' ]);
const ERR_DATA = '데이타 가져오기에 실패했습니다.';

churchApp.run(function($rootScope){

	});

churchApp.controller('StaticSubCtrl', function(menuService, $scope, $routeParams, $compile, $anchorScroll, $location) {
	$scope.gotoAnchor = function(x) {
	      var newHash = 'anchor' + x;
	      if ($location.hash() !== newHash) {
	        // set the $location.hash to `newHash` and
	        // $anchorScroll will automatically scroll to it
	        $location.hash('anchor' + x);
	      } else {
	        // call $anchorScroll() explicitly,
	        // since $location.hash hasn't changed
	        $anchorScroll();
	      }
	    };

	if(_isMobile) {
		menuService.getMenu().then(function() {
			menuService.setSubMenu($routeParams.pgid);
			var menus = [];

			for(var i = 0; i< menuService.leftMenu.length; i ++) {
				if(menuService.leftMenu[i].type == 'html') {
					menus.push({
							'title': menuService.leftMenu[i].title,
							'pgid': menuService.leftMenu[i].pgid,
							'url':'/html/contents/' +menuService.leftMenu[i].pgid + '.html'
					});

				}
			}
			$scope.curAnchor = '/html/contents/' +$routeParams.pgid + '.html'
			$scope.template = {
					'pgid' : $routeParams.pgid,
					'menus' : menus
			};
			$scope.finishLoading = function(event, templateName) {
				console.log();
			}
			$scope.$on("$includeContentLoaded", function(event, templateName){
				if(templateName == $scope.curAnchor ) {
					$scope.gotoAnchor($routeParams.pgid);
				}
			});

		})
	} else {
		$scope.template = {
			'pgid' : $routeParams.pgid,
			'url' : './html/contents/' + $routeParams.pgid + '.html'
		};
		console.log('/+Param: ' + $scope.template.url + " mid:" +menuService.mid)
	}
} );

churchApp.controller('MenuCtrl', function MenuCtrl(menuService, $scope) {
	menuService.getMenu().then(function(result) {
		$scope.menuList = result;
	});
});

churchApp.controller('LeftMenuCtrl',
	function MenuCtrl(menuService, $scope,	$routeParams) {
		if($routeParams.pgid) {
			menuService.setSubMenu($routeParams.pgid);
		}
		$scope.menuList = menuService.leftMenu;
});

churchApp.controller('SubBannerCtrl',
		function SubBannerCtrl(menuService, $scope,	$routeParams) {
			if($routeParams.pgid) {
				menuService.setSubMenu($routeParams.pgid);
			}
			$scope.mid = menuService.mid;
			$scope.mtext = menuService.mtext;
	});

churchApp.factory('menuService', function($http) {
	var menuService = {
		leftMenu: [],
		mid:"m01",
		mtext:"About Coska",
		fullMenu: [],
		getMenu : function() {
			var promise = $http.get('/html/menu.json',{cache:true}).then(
				function(response) {
					menuService.fullMenu = response.data;
					return response.data;
				}, function errorCallback(response) {
					processError(response);
				});
			return promise;
		},
		setSubMenu : function(pgid) {
			var menu = [];
			this.mid = pgid.substring(0,3);
			if(menuService.fullMenu.length == 0) {

			} else {
				for(var i = 0; i< menuService.fullMenu.length; i ++) {
					if(menuService.fullMenu[i].pgid == this.mid) {
						menu= menuService.fullMenu[i].subMenu;
						break;
					}
				}
			}
			switch(this.mid) {
			    case 'm02':
			        this.mtext = 'm02';
			        break;
			    case 'm03':
			        this.mtext = 'm03';
			        break;
			    case 'm04':
			        this.mtext = 'm03';
			        break;
			    case 'm05':
			        this.mtext = 'm03';
			        break;
			    default:
			        this.mtext = "m03"
			}
			menuService.leftMenu = menu;
		}
	};
	return menuService;
});

churchApp.controller('MainCtrl', function MainController(boardService, $scope,  $location) {
	$scope.go = function ( path ) {
		  $location.path( path );
	};
	/*
	boardService.getMainVideos().then(function(result) {
		$scope.video1 = result.video1;
		$scope.video2 = result.video2;
		$scope.video3 = result.video3;
	});

	boardService.getCarousels().then(function(result) {
		$scope.carousels = result.items;
	});

	boardService.getList(5).then(function(result) {
		$scope.newBoardInfo = result.boardInfo;
		$scope.newItems = result.items;
	});

	boardService.getList(6).then(function(result) {
		$scope.galleryBoardInfo = result.boardInfo;
		$scope.galleryItems = result.items;
	});
	*/
});

churchApp.controller('BoardListCtrl', function BoardListController(boardService,menuService,
		$scope, $routeParams) {
	var boardInfo = {
		"id" : $routeParams.boardId,
		"pgid" : $routeParams.pgid,
		"curPage" : $routeParams.curPage ? $routeParams.curPage:1
	}
	boardService.getList(boardInfo).then(function(result) {
		$scope.boardInfo = (result) ? result.boardInfo : boardInfo;
		$scope.items = result.items;
		$scope.mode = $scope.boardInfo.type;
		$scope.curPage = result.curPage;
		$scope.prevRange = result.prevRange;
		$scope.nextRange = result.nextRange;
		$scope.pgid = result.pgid;
		menuService.setSubMenu($scope.boardInfo.pgid);
	});

});

churchApp.controller('BoardViewCtrl', function BoardViewController(boardService, menuService, $scope, $routeParams, $location) {
	$scope.go = function($boardInfo) {
		$location.path('/boards/' + $boardInfo.id);
	};
	var boardInfo = {
		"id" : $routeParams.boardId,
		"pgid" : $routeParams.pgid,
		"curPage":$routeParams.curPage
	}
	menuService.menuObj = menuService.getMenu($routeParams.pgid);
	boardService.getItem(boardInfo, $routeParams.itemId).then(function(result) {
		$scope.boardInfo = (result) ? result.boardInfo : boardInfo;
		$scope.mode = 'generalView';
		$scope.item = result.item;
		$scope.attaches = result.attaches;
		$scope.pgid = result.pgid;
		$scope.curPage = result.curPage;
		menuService.menuObj = menuService.getMenu($scope.boardInfo.pgid);
	});
});

churchApp.factory('boardService', function($http) {
	var processError = function(response) {
		alert(ERR_DATA + '.(' + response.status + ', ' + response.statusText
				+ ')');
	}

	var boardService = {
		getList : function($boardInfo) {
			if (!angular.isObject($boardInfo)) {
				$boardInfo = {
					"id" : $boardInfo
				}
			}

			var promise = $http.get(apiBase + '/boards/' + $boardInfo.id + '/?pgid='+$boardInfo.pgid+'&curPage='+$boardInfo.curPage)
					.then(function(response) {
						return response.data;
					}, function errorCallback(response) {
						processError(response);
					});
			return promise;
		},
		getItem : function($boardInfo, $itemId) {
			var promise = $http.get(
					apiBase + '/boards/' + $boardInfo.id + '/items/' + $itemId + '/?pgid='+$boardInfo.pgid+'&curPage='+$boardInfo.curPage).then(function(response) {
				return response.data;
			}, function errorCallback(response) {
				processError(response);
			});
			return promise;
		},
		getMainVideos : function() {
			var promise = $http.get(apiBase + '/mainvideos/',{cache:true}).then(
					function(response) {
						return response.data;
					}, function errorCallback(response) {
						//processError(response);
					});
			return promise;
		},
		getCarousels : function() {
			var promise = $http.get(apiBase + '/carousels/',{cache:true}).then(
					function(response) {
						return response.data;
					}, function errorCallback(response) {
						//processError(response);
					});
			return promise;
		}
	};
	return boardService;
});
