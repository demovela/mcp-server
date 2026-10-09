#!/usr/bin/env node
import {spawn} from 'node:child_process';
import {createRequire} from 'node:module';
import {readFileSync} from 'node:fs';
const config=JSON.parse(readFileSync(new URL('./config.json',import.meta.url),'utf8'));
if(process.argv.includes('--version')){console.log(config.version);process.exit(0);}
if(process.argv.includes('--help')){console.log(config.brand+' MCP desktop connector\nRemote endpoint: '+config.endpoint+'\nStart with no arguments. Your browser opens for sign-in and consent.');process.exit(0);}
if(process.argv.length>2){console.error('Unexpected arguments. Use --help for usage.');process.exit(2);}
const require=createRequire(import.meta.url);
const proxy=require.resolve('mcp-remote/dist/proxy.js');
const args=[proxy,config.endpoint,'--transport','http-only'];
if(config.scope)args.push('--static-oauth-client-metadata',JSON.stringify({client_name:config.brand+' Desktop',scope:config.scope}));
const child=spawn(process.execPath,args,{stdio:'inherit',shell:false});
for(const signal of ['SIGINT','SIGTERM'])process.on(signal,()=>child.kill(signal));
child.on('error',()=>{console.error('Unable to start the MCP connector. Reinstall the package and try again.');process.exitCode=1;});
child.on('exit',(code,signal)=>{process.exitCode=code??(signal?1:0);});
