using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(ControlLab.Startup))]
namespace ControlLab
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
