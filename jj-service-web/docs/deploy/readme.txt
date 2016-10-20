部署步骤：
1，切换到本地tomcat部署包所在目录,例如
  cd /Users/myb858/Documents/workspace/.metadata/.plugins/org.eclipse.wst.server.core/tmp8/wtpwebapps/
2，打包
  rm -rf xnhomefront.tar.gz
  tar zcvf xnhomefront.tar.gz xn-home-front/
  scp ./xnhomefront.tar.gz root@121.43.101.148:/home/
3，部署
  ssh root@121.43.101.148
  cd /home/tomcat_develop_xnhome_front/webapps/
  rm -rf xnhomefront.tar.gz
  cp ./xn-home-front/WEB-INF/classes/application.properties .
  rm -rf xn-home-front/
  mv /home/xnhomefront.tar.gz .
  tar zxvf xnhomefront.tar.gz
  mv application.properties ./xn-home-front/WEB-INF/classes/
4,起停tomcat_develop_account




