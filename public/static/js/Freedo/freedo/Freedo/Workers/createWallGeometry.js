/**
 * Cesium - https://github.com/AnalyticalGraphicsInc/cesium
 *
 * Copyright 2011-2017 Cesium Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Columbus View (Pat. Pend.)
 *
 * Portions licensed separately.
 * See https://github.com/AnalyticalGraphicsInc/cesium/blob/master/LICENSE.md for full licensing details.
 */
define(["./defined-b9ff0e39","./Check-e6691f86","./freezeObject-2d5b18ce","./defaultValue-199f5aa8","./Math-92bd3539","./Cartesian2-8fa798b8","./defineProperties-ae15c9d5","./objectToQuery-2e382d4d","./Transforms-c1305e13","./RuntimeError-d5522ee3","./WebGLConstants-554ddbe2","./ComponentDatatype-569c1e3e","./GeometryAttribute-7f79e7d6","./when-c208a7cf","./GeometryAttributes-c3465b51","./IndexDatatype-7119db15","./IntersectionTests-0268f2ee","./Plane-c6867c84","./VertexFormat-b4c6d1c2","./EllipsoidTangentPlane-29b9a994","./EllipsoidRhumbLine-fb5cc30d","./PolygonPipeline-b5df6024","./EllipsoidGeodesic-b8e7c0c6","./PolylinePipeline-15ee8ac6","./WallGeometryLibrary-eb37f35c"],function(Y,e,t,u,Q,Z,a,i,K,n,r,X,$,o,ee,te,s,m,p,l,d,c,f,y,ae){"use strict";var ie=new Z.Cartesian3,ne=new Z.Cartesian3,re=new Z.Cartesian3,oe=new Z.Cartesian3,se=new Z.Cartesian3,me=new Z.Cartesian3,le=new Z.Cartesian3,de=new Z.Cartesian3;function g(e){var t=(e=u.defaultValue(e,u.defaultValue.EMPTY_OBJECT)).positions,a=e.maximumHeights,i=e.minimumHeights,n=u.defaultValue(e.vertexFormat,p.VertexFormat.DEFAULT),r=u.defaultValue(e.granularity,Q.CesiumMath.RADIANS_PER_DEGREE),o=u.defaultValue(e.ellipsoid,Z.Ellipsoid.WGS84);this._positions=t,this._minimumHeights=i,this._maximumHeights=a,this._vertexFormat=p.VertexFormat.clone(n),this._granularity=r,this._ellipsoid=Z.Ellipsoid.clone(o),this._workerName="createWallGeometry";var s=1+t.length*Z.Cartesian3.packedLength+2;Y.defined(i)&&(s+=i.length),Y.defined(a)&&(s+=a.length),this.packedLength=s+Z.Ellipsoid.packedLength+p.VertexFormat.packedLength+1}g.pack=function(e,t,a){var i;a=u.defaultValue(a,0);var n=e._positions,r=n.length;for(t[a++]=r,i=0;i<r;++i,a+=Z.Cartesian3.packedLength)Z.Cartesian3.pack(n[i],t,a);var o=e._minimumHeights;if(r=Y.defined(o)?o.length:0,t[a++]=r,Y.defined(o))for(i=0;i<r;++i)t[a++]=o[i];var s=e._maximumHeights;if(r=Y.defined(s)?s.length:0,t[a++]=r,Y.defined(s))for(i=0;i<r;++i)t[a++]=s[i];return Z.Ellipsoid.pack(e._ellipsoid,t,a),a+=Z.Ellipsoid.packedLength,p.VertexFormat.pack(e._vertexFormat,t,a),t[a+=p.VertexFormat.packedLength]=e._granularity,t};var h=Z.Ellipsoid.clone(Z.Ellipsoid.UNIT_SPHERE),v=new p.VertexFormat,C={positions:void 0,minimumHeights:void 0,maximumHeights:void 0,ellipsoid:h,vertexFormat:v,granularity:void 0};return g.unpack=function(e,t,a){var i;t=u.defaultValue(t,0);var n,r,o=e[t++],s=new Array(o);for(i=0;i<o;++i,t+=Z.Cartesian3.packedLength)s[i]=Z.Cartesian3.unpack(e,t);if(0<(o=e[t++]))for(n=new Array(o),i=0;i<o;++i)n[i]=e[t++];if(0<(o=e[t++]))for(r=new Array(o),i=0;i<o;++i)r[i]=e[t++];var m=Z.Ellipsoid.unpack(e,t,h);t+=Z.Ellipsoid.packedLength;var l=p.VertexFormat.unpack(e,t,v),d=e[t+=p.VertexFormat.packedLength];return Y.defined(a)?(a._positions=s,a._minimumHeights=n,a._maximumHeights=r,a._ellipsoid=Z.Ellipsoid.clone(m,a._ellipsoid),a._vertexFormat=p.VertexFormat.clone(l,a._vertexFormat),a._granularity=d,a):(C.positions=s,C.minimumHeights=n,C.maximumHeights=r,C.granularity=d,new g(C))},g.fromConstantHeights=function(e){var t,a,i=(e=u.defaultValue(e,u.defaultValue.EMPTY_OBJECT)).positions,n=e.minimumHeight,r=e.maximumHeight,o=Y.defined(n),s=Y.defined(r);if(o||s){var m=i.length;t=o?new Array(m):void 0,a=s?new Array(m):void 0;for(var l=0;l<m;++l)o&&(t[l]=n),s&&(a[l]=r)}return new g({positions:i,maximumHeights:a,minimumHeights:t,ellipsoid:e.ellipsoid,vertexFormat:e.vertexFormat})},g.createGeometry=function(e){var t=e._positions,a=e._minimumHeights,i=e._maximumHeights,n=e._vertexFormat,r=e._granularity,o=e._ellipsoid,s=ae.WallGeometryLibrary.computePositions(o,t,i,a,r,!0);if(Y.defined(s)){var m,l=s.bottomPositions,d=s.topPositions,u=s.numCorners,p=d.length,c=2*p,f=n.position?new Float64Array(c):void 0,y=n.normal?new Float32Array(c):void 0,g=n.tangent?new Float32Array(c):void 0,h=n.bitangent?new Float32Array(c):void 0,v=n.st?new Float32Array(c/3*2):void 0,C=0,b=0,A=0,x=0,_=0,E=de,w=le,F=me,L=!0,P=0,k=1/((p/=3)-t.length+1);for(m=0;m<p;++m){var G=3*m,V=Z.Cartesian3.fromArray(d,G,ie),H=Z.Cartesian3.fromArray(l,G,ne);if(n.position&&(f[C++]=H.x,f[C++]=H.y,f[C++]=H.z,f[C++]=V.x,f[C++]=V.y,f[C++]=V.z),n.st&&(v[_++]=P,v[_++]=0,v[_++]=P,v[_++]=1),n.normal||n.tangent||n.bitangent){var T,D=Z.Cartesian3.clone(Z.Cartesian3.ZERO,se),z=o.scaleToGeodeticSurface(Z.Cartesian3.fromArray(d,G,ne),ne);if(m+1<p&&(T=o.scaleToGeodeticSurface(Z.Cartesian3.fromArray(d,3+G,re),re),D=Z.Cartesian3.fromArray(d,3+G,se)),L){var O=Z.Cartesian3.subtract(D,V,oe),S=Z.Cartesian3.subtract(z,V,ie);E=Z.Cartesian3.normalize(Z.Cartesian3.cross(S,O,E),E),L=!1}Z.Cartesian3.equalsEpsilon(T,z,Q.CesiumMath.EPSILON10)?L=!0:(P+=k,n.tangent&&(w=Z.Cartesian3.normalize(Z.Cartesian3.subtract(T,z,w),w)),n.bitangent&&(F=Z.Cartesian3.normalize(Z.Cartesian3.cross(E,w,F),F))),n.normal&&(y[b++]=E.x,y[b++]=E.y,y[b++]=E.z,y[b++]=E.x,y[b++]=E.y,y[b++]=E.z),n.tangent&&(g[x++]=w.x,g[x++]=w.y,g[x++]=w.z,g[x++]=w.x,g[x++]=w.y,g[x++]=w.z),n.bitangent&&(h[A++]=F.x,h[A++]=F.y,h[A++]=F.z,h[A++]=F.x,h[A++]=F.y,h[A++]=F.z)}}var I=new ee.GeometryAttributes;n.position&&(I.position=new $.GeometryAttribute({componentDatatype:X.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:f})),n.normal&&(I.normal=new $.GeometryAttribute({componentDatatype:X.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:y})),n.tangent&&(I.tangent=new $.GeometryAttribute({componentDatatype:X.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:g})),n.bitangent&&(I.bitangent=new $.GeometryAttribute({componentDatatype:X.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:h})),n.st&&(I.st=new $.GeometryAttribute({componentDatatype:X.ComponentDatatype.FLOAT,componentsPerAttribute:2,values:v}));var R=c/3;c-=6*(u+1);var M=te.IndexDatatype.createTypedArray(R,c),N=0;for(m=0;m<R-2;m+=2){var W=m,B=m+2,U=Z.Cartesian3.fromArray(f,3*W,ie),j=Z.Cartesian3.fromArray(f,3*B,ne);if(!Z.Cartesian3.equalsEpsilon(U,j,Q.CesiumMath.EPSILON10)){var q=m+1,J=m+3;M[N++]=q,M[N++]=W,M[N++]=J,M[N++]=J,M[N++]=W,M[N++]=B}}return new $.Geometry({attributes:I,indices:M,primitiveType:$.PrimitiveType.TRIANGLES,boundingSphere:new K.BoundingSphere.fromVertices(f)})}},function(e,t){return Y.defined(t)&&(e=g.unpack(e,t)),e._ellipsoid=Z.Ellipsoid.clone(e._ellipsoid),g.createGeometry(e)}});
