var jest = {
	"transform": {
		".(ts|tsx)": "ts-jest"
		// 表示把.ts和.tsx后缀文件内容转换成js
	},
	"testEnvironment": "node", // 表示测试环境，还可以是jsdom
	"testRegex": "(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$",
	// 表示__tests__目录下的.test/spec.ts/tsx/js文件都需要跑测试
	"moduleFileExtensions": [ // 引入模块扩展名
		"ts",
		"tsx",
		"js"
	],
	"coveragePathIgnorePatterns": [ // 忽略的文件夹
		"/node_modules/",
		"/test/"
	],
	"coverageThreshold": { // 测试覆盖率的阈值设定，达不到就会失败
		"global": {
			"branches": 90, // 代码分支覆盖率达到90%
			"functions": 95, // 方法覆盖率达到95%
			"lines": 95, // 代码行数覆盖率达到95%
			"statements": 95 // 声明覆盖率达到95%
		}
	},
	"collectCoverageFrom": [ // 收集指定文件的测试覆盖率
		"src/*.{js,ts}"
	]
};