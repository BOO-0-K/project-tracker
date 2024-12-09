import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";
import { ITemplate, useTemplatesQuery } from "../hooks/useTemplate";
import { useLogout } from "../hooks/useAuth";
import { useEffect } from "react";

const Sidebar = styled.div`
    padding: 20px 10px;
    background-color: ${(props) => props.theme.sidebarColor};
    border-radius: 5px;
    height: 100%;
    width: 20%;
    min-width: 120px;
    max-width: 240px;
    overflow: scroll;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
`;

const SidebarItem = styled.span`
    color: white;
    font-weight: 600;
    line-height: 25px;
`;

const LogoutBtn = styled.span`
    position: absolute;
    bottom: 10px;
    color: white;
    font-weight: 600;
    line-height: 25px;
    cursor: pointer;
`;

function Layout() {
    const { isLoading, data, isError } = useTemplatesQuery();
    const { logout } = useLogout();
    const handleLogout = () => {
        logout();
    }

    useEffect(() => {
        if (isError) {
            logout();
        }
    }, [isError, logout]);
    
    return (
        <>
            <Sidebar>
                {
                    isLoading ? (
                        <SidebarItem>Loading...</SidebarItem>
                    ) : (
                        data?.templates.map((template: ITemplate, index: number) => {
                            return (
                                <Link to={`/todo/${template.id}`} key={template.id}>
                                    <SidebarItem>
                                        {template.name}
                                    </SidebarItem>
                                </Link>
                            );
                        })
                    )
                }
                <LogoutBtn onClick={handleLogout}>로그아웃</LogoutBtn>
            </Sidebar>
            <Outlet />
            
        </>
    );
}

export default Layout;