## 将项目拷出来，作为一个独立的仓库

比如说你拷到`~/todo/`这个目录里之后

1. 进入`~/todo`，`git init && git add . && git commit -m "v1" && git remote add origin http://github.com/xxx.git && git push -u origin master`
2. 在`http://biaoyansu.com/dash/my_project`中创建项目（如：`todo`)
3. `ssh username@xxx.com`
4. `cd todo`
5. `git init && git remote add origin http://github.com/xxx.git && git fetch && git reset --hard origin/master`

以后，如果本地代码发生了变化，就可以先推到github然后在服务器拉取github最新的代码。（重复6，7步）

6. `git push -u origin master`
7. `git pull origin master`

## 图床

()[https://sm.ms/]
