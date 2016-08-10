// var blogApp = angular.module("BlogApp", ['infinite-scroll', 'angularLazyImg', 'loader'])

app.controller("BlogController", function ($scope, $http, $timeout) {

	var start = 0,
		len = 9;

	$scope.categoryId = $("#category").attr("category-id");
	$scope.isLoadingPost = false;
	$scope.noMorePost = false;
	$scope.posts = [];
	$scope.myPagingFunction = function () {
		$scope.loadPosts();
	};

	$scope.loadPosts = function () {

		if ($scope.noMorePost) return;

		$scope.isLoadingPost = true;

		var params = {
			start: start,
			len: len
		};
		
		if ($scope.categoryId) {
			params.category = $scope.categoryId;
		}

		$http.get("/getArticles", {
			params: params
		}).success(function (posts) {
			start = start + posts.length;
			$scope.isLoadingPost = false;
			Array.prototype.push.apply($scope.posts, posts);
			// 完了！
			if (posts.length < len) {
				$scope.noMorePost = true;
			}
		});
	};

	$scope.init = function () {
		$scope.loadPosts();
	};

});