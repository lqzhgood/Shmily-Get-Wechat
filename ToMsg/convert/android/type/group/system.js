function system(v) {
    let html = '群聊系统消息 未知类型';
    const sysmsg = v.content.sysmsg;
    switch (sysmsg.type) {
        case 'sysmsgtemplate': {
            const { template, link_list } = sysmsg.sysmsgtemplate.content_template;

            const link = Array.isArray(link_list.link) ? link_list.link : [link_list.link];

            html = link.reduce((pre, cV) => {
                const key = cV.name;
                let value;
                switch (cV.type) {
                    case 'link_plain': {
                        value = cV.plain;
                        break;
                    }
                    case 'link_profile': {
                        let member = cV.memberlist.member;
                        if (!Array.isArray(member)) {
                            member = [member];
                        }

                        value = member.map(({ username, nickname }) => nickname || username).join(',');

                        break;
                    }
                    case 'link_revoke': {
                        value = cV.title;
                        break;
                    }
                    default:
                        console.log('❌', '群聊系统消息 未知类型 未知的模板类型', JSON.stringify(sysmsg, null, 4));
                        break;
                }

                pre = pre.replaceAll('$' + key + '$', value);
                return pre;
            }, template);

            break;
        }

        default:
            console.log('❌', '群聊系统消息 未知类型', JSON.stringify(v, null, 4));
            html += `<br />${JSON.stringify(v, null, 4)}`;
            break;
    }
    return html;
}

module.exports = system;
