/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import angular from 'angular';

// Common directives.
import previewPanel from './configuration/preview-panel.directive.js';

// Summary screen.
import ConfigurationSummaryCtrl from './configuration/summary/summary.controller';
import ConfigurationResource from './configuration/Configuration.resource';
import summaryTabs from './configuration/summary/summary-tabs.directive';
import IgniteSummaryZipper from './configuration/summary/summary-zipper.service';

import clustersTpl from 'views/configuration/clusters.tpl.pug';
import cachesTpl from 'views/configuration/caches.tpl.pug';
import domainsTpl from 'views/configuration/domains.tpl.pug';
import igfsTpl from 'views/configuration/igfs.tpl.pug';
import summaryTpl from 'views/configuration/summary.tpl.pug';
import summaryTabsTemplateUrl from 'views/configuration/summary-tabs.pug';

import clustersCtrl from 'Controllers/clusters-controller';
import domainsCtrl from 'Controllers/domains-controller';
import cachesCtrl from 'Controllers/caches-controller';
import igfsCtrl from 'Controllers/igfs-controller';

import base2 from 'views/base2.pug';

angular.module('ignite-console.states.configuration', ['ui.router'])
    .directive(...previewPanel)
    // Summary screen
    .directive(...summaryTabs)
    // Services.
    .service('IgniteSummaryZipper', IgniteSummaryZipper)
    .service('IgniteConfigurationResource', ConfigurationResource)
    .run(['$templateCache', ($templateCache) => {
        $templateCache.put('summary-tabs.html', summaryTabsTemplateUrl);
    }])
    // Configure state provider.
    .config(['$stateProvider', 'AclRouteProvider', ($stateProvider, AclRoute) => {
        // Setup the states.
        $stateProvider
            .state('base.configuration', {
                abstract: true,
                views: {
                    '@': {
                        template: base2
                    }
                }
            })
            .state('base.configuration.tabs', {
                url: '/configuration',
                template: '<page-configure></page-configure>',
                metaTags: {
                    title: 'Configuration'
                }
            })
            .state('base.configuration.tabs.basic', {
                url: '/basic',
                template: '<page-configure-basic></page-configure-basic>',
                metaTags: {
                    title: 'Basic Configuration'
                },
                resolve: {
                    list: ['IgniteConfigurationResource', 'PageConfigure', (configuration, pageConfigure) => {
                        // TODO IGNITE-5271: remove when advanced config is hooked into ConfigureState too.
                        // This resolve ensures that basic always has fresh data, i.e. after going back from advanced
                        // after adding a cluster.
                        return configuration.read().then((data) => {
                            pageConfigure.loadList(data);
                        });
                    }]
                }
            })
            .state('base.configuration.tabs.advanced', {
                url: '/advanced',
                template: '<page-configure-advanced></page-configure-advanced>'
            })
            .state('base.configuration.tabs.advanced.clusters', {
                url: '/clusters',
                templateUrl: clustersTpl,
                onEnter: AclRoute.checkAccess('configuration'),
                metaTags: {
                    title: 'Configure Clusters'
                },
                controller: clustersCtrl,
                controllerAs: '$ctrl'
            })
            .state('base.configuration.tabs.advanced.caches', {
                url: '/caches',
                templateUrl: cachesTpl,
                onEnter: AclRoute.checkAccess('configuration'),
                metaTags: {
                    title: 'Configure Caches'
                },
                controller: cachesCtrl,
                controllerAs: '$ctrl'
            })
            .state('base.configuration.tabs.advanced.domains', {
                url: '/domains',
                templateUrl: domainsTpl,
                onEnter: AclRoute.checkAccess('configuration'),
                metaTags: {
                    title: 'Configure Domain Model'
                },
                controller: domainsCtrl,
                controllerAs: '$ctrl'
            })
            .state('base.configuration.tabs.advanced.igfs', {
                url: '/igfs',
                templateUrl: igfsTpl,
                onEnter: AclRoute.checkAccess('configuration'),
                metaTags: {
                    title: 'Configure IGFS'
                },
                controller: igfsCtrl,
                controllerAs: '$ctrl'
            })
            .state('base.configuration.tabs.advanced.summary', {
                url: '/summary',
                templateUrl: summaryTpl,
                onEnter: AclRoute.checkAccess('configuration'),
                controller: ConfigurationSummaryCtrl,
                controllerAs: 'ctrl',
                metaTags: {
                    title: 'Configurations Summary'
                }
            });
    }]);
